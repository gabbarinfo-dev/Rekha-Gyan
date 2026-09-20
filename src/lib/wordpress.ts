export interface WordPressPost {
  id: number;
  date: string;
  slug: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  content: { rendered: string };
  featured_media_url?: string;
  author_name?: string;
  categories?: string[];
}

export interface ReadingLogPayload {
  name: string;
  dob: string;
  tob: string;
  pob: string;
  question: string;
  lifeFocus: string;
  leftPalmUrl?: string;
  rightPalmUrl?: string;
  readingSummary: string;
}

const WP_URL = process.env.WORDPRESS_URL || "https://rekhagyan.online";
const WP_USER = process.env.WORDPRESS_USER || "ndantare";
const WP_PASS = process.env.WORDPRESS_APP_PASSWORD || "NishantD1234";

function getBasicAuthHeader(): string {
  const credentials = `${WP_USER}:${WP_PASS}`;
  return `Basic ${Buffer.from(credentials).toString("base64")}`;
}

export interface WordPressMediaUploadResult {
  id: number;
  url: string;
}

/**
 * Upload palm image file to WordPress Media Library
 */
export async function uploadPalmToWordPress(
  base64Data: string,
  filename: string
): Promise<WordPressMediaUploadResult | null> {
  try {
    const match = base64Data.match(/^data:([^;]+);base64,(.+)$/);
    if (!match) {
      console.warn("Invalid base64 image data provided to WordPress upload");
      return null;
    }

    const mimeType = match[1];
    const buffer = Buffer.from(match[2], "base64");

    const endpoint = `${WP_URL.replace(/\/+$/, "")}/wp-json/wp/v2/media`;

    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        Authorization: getBasicAuthHeader(),
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Content-Type": mimeType,
      },
      body: buffer,
    });

    if (!res.ok) {
      console.warn(`WordPress media upload returned status ${res.status}:`, await res.text());
      return null;
    }

    const data = await res.json();
    return {
      id: data.id,
      url: data.source_url || "",
    };
  } catch (err) {
    console.error("WordPress media upload failed:", err);
    return null;
  }
}

/**
 * Delete media file from WordPress hosting after vision analysis completes
 */
export async function deleteMediaFromWordPress(mediaId: number): Promise<boolean> {
  try {
    const endpoint = `${WP_URL.replace(/\/+$/, "")}/wp-json/wp/v2/media/${mediaId}?force=true`;
    const res = await fetch(endpoint, {
      method: "DELETE",
      headers: {
        Authorization: getBasicAuthHeader(),
      },
    });

    if (!res.ok) {
      console.warn(`WordPress media delete returned status ${res.status}`);
      return false;
    }

    console.log(`Successfully deleted palm photo ${mediaId} from WordPress hosting.`);
    return true;
  } catch (err) {
    console.error(`Failed to delete media ${mediaId} from WordPress:`, err);
    return false;
  }
}

/**
 * Store completed reading in WordPress
 */
export async function logReadingToWordPress(
  payload: ReadingLogPayload
): Promise<number | null> {
  try {
    const endpoint = `${WP_URL.replace(/\/+$/, "")}/wp-json/wp/v2/posts`;

    const postContent = `
<!-- Rekha Reading Log -->
<h3>Consultation for ${payload.name}</h3>
<p><strong>DOB:</strong> ${payload.dob} | <strong>TOB:</strong> ${payload.tob || "N/A"} | <strong>POB:</strong> ${payload.pob}</p>
<p><strong>Focus Area:</strong> ${payload.lifeFocus}</p>
<p><strong>User Question:</strong> <em>"${payload.question}"</em></p>
<hr />
${payload.leftPalmUrl ? `<p><strong>Left Palm:</strong> <a href="${payload.leftPalmUrl}" target="_blank">View Left Palm</a></p>` : ""}
${payload.rightPalmUrl ? `<p><strong>Right Palm:</strong> <a href="${payload.rightPalmUrl}" target="_blank">View Right Palm</a></p>` : ""}
<hr />
<h4>Synthesized Reading:</h4>
<div>${payload.readingSummary.slice(0, 4000)}</div>
    `.trim();

    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        Authorization: getBasicAuthHeader(),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: `[Rekha Reading] ${payload.name} - ${payload.dob}`,
        content: postContent,
        status: "private", // stored safely for user privacy
      }),
    });

    if (!res.ok) {
      console.warn(`WordPress post creation status ${res.status}:`, await res.text());
      return null;
    }

    const data = await res.json();
    return data.id || null;
  } catch (err) {
    console.error("Failed to log reading to WordPress:", err);
    return null;
  }
}

/**
 * Fetch published blog posts from WordPress REST API
 */
export async function getWordPressPosts(): Promise<WordPressPost[]> {
  try {
    const endpoint = `${WP_URL.replace(/\/+$/, "")}/wp-json/wp/v2/posts?_embed&per_page=12`;
    const res = await fetch(endpoint, {
      next: { revalidate: 3600 },
      headers: {
        Accept: "application/json",
      },
    });

    if (!res.ok) {
      console.warn("WP posts returned error, serving curated fallback posts:", res.status);
      return getCuratedFallbackPosts();
    }

    const posts = await res.json();
    if (!Array.isArray(posts) || posts.length === 0) {
      return getCuratedFallbackPosts();
    }

    return posts.map((p: any) => ({
      id: p.id,
      date: p.date,
      slug: p.slug,
      title: p.title,
      excerpt: p.excerpt,
      content: p.content,
      featured_media_url:
        p._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
        "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80",
      author_name: p._embedded?.author?.[0]?.name || "Rekha Astro Editorial",
    }));
  } catch (err) {
    console.error("Error fetching WordPress posts:", err);
    return getCuratedFallbackPosts();
  }
}

/**
 * Fetch a single blog post by slug
 */
export async function getWordPressPostBySlug(
  slug: string
): Promise<WordPressPost | null> {
  try {
    const endpoint = `${WP_URL.replace(/\/+$/, "")}/wp-json/wp/v2/posts?slug=${encodeURIComponent(slug)}&_embed`;
    const res = await fetch(endpoint, {
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      return getCuratedFallbackPosts().find((p) => p.slug === slug) || null;
    }

    const posts = await res.json();
    if (Array.isArray(posts) && posts.length > 0) {
      const p = posts[0];
      return {
        id: p.id,
        date: p.date,
        slug: p.slug,
        title: p.title,
        excerpt: p.excerpt,
        content: p.content,
        featured_media_url:
          p._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
          "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80",
        author_name: p._embedded?.author?.[0]?.name || "Rekha Astro Editorial",
      };
    }

    return getCuratedFallbackPosts().find((p) => p.slug === slug) || null;
  } catch {
    return getCuratedFallbackPosts().find((p) => p.slug === slug) || null;
  }
}

/**
 * Curated classical Vedic Palmistry posts for SEO & instant value
 */
function getCuratedFallbackPosts(): WordPressPost[] {
  return [
    {
      id: 101,
      slug: "secret-vedic-palm-signs-matsya-trishul-wealth",
      date: new Date().toISOString(),
      title: { rendered: "Rare Vedic Palm Signs: What the Matsya (Fish) and Trishul Really Mean for Your Wealth" },
      excerpt: {
        rendered:
          "In classical Samudrika Shastra, markings like the Fish (Matsya) on Ketu or Jupiter indicate divine spiritual wealth and sudden fortune. Learn how to verify authentic signs from superficial creases.",
      },
      featured_media_url:
        "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=1200&q=80",
      author_name: "REKHA Master Astrologer",
      content: {
        rendered: `
<p>For thousands of years, the masters of <strong>Samudrika Shastra</strong> and <strong>Hastasanjivani</strong> documented how specific energy vortices on the human palm crystallize into distinct geometric archetypes.</p>
<h3>1. The Matsya (Fish) Sign</h3>
<p>The Fish sign is characterized by two distinct curves intersecting to form a tail. According to classical scriptures:</p>
<ul>
  <li><strong>On the Mount of Jupiter:</strong> Confirms leadership, noble lineage, and high recognition in community or state.</li>
  <li><strong>At the base of the Fate Line (Mount of Ketu):</strong> Indicates sudden financial breakthroughs, foreign settlement, and spiritual discernment.</li>
</ul>
<h3>2. The Trishul (Trident) of Shiva</h3>
<p>When the Fate Line or Sun Line splits into three symmetrical branches pointing towards the fingers, it forms the sacred trident. This represents the confluence of Saraswati (wisdom), Lakshmi (prosperity), and Durga (invincible will).</p>
<h3>Why Modern AI Palmistry is Different</h3>
<p>Human astrologers often misread faint creases as auspicious signs. At <strong>Rekha Gyan</strong>, our neural vision system cross-references mount elevation, skin texture, and 50+ classical authoritative manuscripts before validating any marking.</p>
        `,
      },
    },
    {
      id: 102,
      slug: "saturn-mahadasha-job-change-career-astrology",
      date: new Date(Date.now() - 86400000 * 2).toISOString(),
      title: { rendered: "Navigating Saturn (Shani) Mahadasha: When Will Your Career Breakthrough Finally Arrive?" },
      excerpt: {
        rendered:
          "Saturn Mahadasha is the Great Karmic Sculptor. Discover why delays are not denials, and how to identify the precise Antardasha that triggers promotion, business expansion, or foreign relocation.",
      },
      featured_media_url:
        "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80",
      author_name: "REKHA Master Astrologer",
      content: {
        rendered: `
<p>Many natives live in unwarranted fear of Lord Shani (Saturn). Yet in the classical treatise <em>Saravali</em>, Kalyanavarma proclaims Saturn as the architect of enduring empires.</p>
<h3>The Karmic Filter Phase</h3>
<p>The first phase of Saturn Mahadasha strips away unaligned projects, false relationships, and ungrounded expectations. It teaches relentless discipline.</p>
<h3>The Acceleration Sub-periods</h3>
<ul>
  <li><strong>Saturn-Mercury:</strong> Sharp surge in business opportunities, intellect, and contract closures.</li>
  <li><strong>Saturn-Venus:</strong> Sudden emotional fulfillment, purchase of luxury assets, and societal honor.</li>
</ul>
<p>Get your complete Kundali and Palm reading with <strong>REKHA</strong> to see where your Saturn resides and what remedies unblock its highest blessings.</p>
        `,
      },
    },
    {
      id: 103,
      slug: "left-palm-vs-right-palm-which-hand-to-read",
      date: new Date(Date.now() - 86400000 * 5).toISOString(),
      title: { rendered: "Left Hand vs Right Hand: The Ancient Truth Behind Which Palm You Must Read" },
      excerpt: {
        rendered:
          "Debunking the myth that men read right and women read left. In authentic Hastarekha Shastra, one hand reflects the seed (Prarabdha), while the other reveals the fruit (Kriyamana karma).",
      },
      featured_media_url:
        "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1200&q=80",
      author_name: "REKHA Master Astrologer",
      content: {
        rendered: `
<p>One of the most widespread misconceptions in contemporary street palmistry is the simplistic dogma: <em>'Men read the right hand; women read the left hand.'</em></p>
<p>Classical scriptures like <strong>Hastasanjivani</strong> reject this crude division entirely. The human energy body does not operate on 20th-century gender stereotypes.</p>
<h3>The True Vedic Division</h3>
<ul>
  <li><strong>Passive Hand (Usually Left for right-handed individuals):</strong> Represents <em>Prarabdha Karma</em> — the genetic blueprint, inherited temperament, subconscious tendencies, and innate potentials you were born with.</li>
  <li><strong>Active Hand (Usually Right for right-handed individuals):</strong> Represents <em>Kriyamana Karma</em> — the conscious decisions, spiritual practices, professional labor, and active destiny you are carving in this lifetime.</li>
</ul>
<p>By comparing both hands simultaneously, <strong>REKHA AI</strong> measures whether you are surpassing your birth chart or being held back by unaddressed karmic loops.</p>
        `,
      },
    },
  ];
}
