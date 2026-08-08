/**
 * Per-article FAQs. Rendered as a visible "Common questions" section AND
 * emitted as FAQPage JSON-LD from the same source (Google requires the Q&A to
 * be visible on the page). Answers are plain text: concise, evidence-consistent
 * with the article, no dosing, no how-to.
 */
export type Faq = { q: string; a: string };

export const faqs: Record<string, Faq[]> = {
  "erectile-function-signal": [
    {
      q: "Is erectile dysfunction a sign of heart disease?",
      a: "Often, yes. The penile arteries are small, so they tend to stiffen and narrow earlier than the coronary ones — which is why erectile trouble can precede a heart attack by years. It is a reason to get a full workup, not just a prescription.",
    },
    {
      q: "Can ED be an early warning of diabetes?",
      a: "It can. Erectile function and metabolic disease share the same small vessels and nerves, and high blood sugar damages both — sometimes before diabetes has been formally diagnosed.",
    },
    {
      q: "Should I see a doctor for occasional erection problems?",
      a: "A one-off is usually nothing. A persistent change is worth an evaluation, because it can flag vascular or metabolic problems that are far better caught early.",
    },
  ],
  "read-your-labs": [
    {
      q: "What blood tests are done for erectile dysfunction?",
      a: "Typically an early-morning testosterone (repeated if it is low), blood sugar or HbA1c, a lipid panel, and sometimes thyroid or prolactin — screening the hormonal and metabolic drivers at the same time.",
    },
    {
      q: "What counts as a normal testosterone level?",
      a: "Normal is a range, not a number to maximize. A deficiency diagnosis rests on two low early-morning readings plus real symptoms, interpreted by a clinician against the rest of your labs — never on a single value.",
    },
    {
      q: "What is SHBG on a testosterone panel?",
      a: "SHBG (sex hormone-binding globulin) is a protein that binds testosterone and keeps it in reserve. It explains why total and free testosterone can tell different stories, which is why both are worth reading together.",
    },
  ],
  "testosterone-therapy": [
    {
      q: "Is testosterone replacement therapy safe?",
      a: "When it treats a real, diagnosed deficiency and is monitored, TRT is legitimate, unglamorous medicine. The risk comes from skipping the diagnosis or the monitoring — hematocrit, PSA, and estradiol are watched to keep it safe.",
    },
    {
      q: "What is the difference between TRT and anabolic steroids?",
      a: "TRT restores a diagnosed deficiency back to a normal range under monitoring. Stacking anabolic steroids on top is supraphysiological enhancement — a different, higher-risk practice, and the line this site draws.",
    },
    {
      q: "Does testosterone therapy affect fertility?",
      a: "It can suppress sperm production, which matters if you may want children. That is a conversation to have with your prescriber before starting, not after.",
    },
  ],
  "pde5-long-term": [
    {
      q: "Do ED pills stop working over time?",
      a: "Usually the drug has not worn out — your vasculature has changed. A fading response is often a signal to re-check vascular and metabolic health rather than simply chase the effect.",
    },
    {
      q: "Can you take PDE5 inhibitors every day?",
      a: "Low-dose daily tadalafil is a recognized option that keeps continuous coverage. Whether daily or as-needed suits you is a prescriber's call.",
    },
    {
      q: "Which blood pressure medications work best with ED?",
      a: "Some, such as nebivolol or telmisartan, tend to be more erection-friendly than older options — worth raising if you are treating both high blood pressure and ED.",
    },
  ],
  "bremelanotide-pde5": [
    {
      q: "What is the difference between bremelanotide and Viagra?",
      a: "They pull different levers: bremelanotide acts on desire in the brain, while PDE5 inhibitors act on the erection itself. That is why combining them has pharmacological logic, though bremelanotide is off-label in men.",
    },
    {
      q: "Is bremelanotide safe to combine with ED pills?",
      a: "The combination is early-stage and off-label in men, and bremelanotide raises blood pressure — so it is a careful, prescriber-supervised conversation. Most of what is sold online is not the approved drug.",
    },
  ],
  "telemedicine-visit": [
    {
      q: "How do I know if an online men's health clinic is legitimate?",
      a: "The test is whether anyone actually evaluated you — a real history, labs when warranted, and follow-up — versus a checkout form with a doctor's signature stapled on.",
    },
    {
      q: "What are the red flags of an ED pill mill?",
      a: "No real evaluation, no labs, no monitoring, and a prescription in ninety seconds. A good visit bridges you toward care; a pill mill just sells.",
    },
  ],
  "what-it-costs": [
    {
      q: "Why is ED treatment so expensive?",
      a: "The price is a stack — labs, a consult, the product, and markup on top — and the prescriber's cut often hides in the middle. Seeing the layers is how you find the real value.",
    },
    {
      q: "How can I get ED treatment for less?",
      a: "The generic molecules cost close to nothing at transparent pharmacies. The value is in paying less for the same legitimate, monitored care — never in cutting the diagnosis, prescription, or labs that keep you safe.",
    },
  ],
  "generic-pde5-value": [
    {
      q: "Is generic sildenafil as good as Viagra?",
      a: "It is the same molecule. The gap between a few dollars and a few hundred is markup, not medicine — the patent expired years ago.",
    },
    {
      q: "Where can I fill an ED prescription cheaply?",
      a: "Transparent-pricing pharmacies like Cost Plus Drugs often beat a copay outright, and a 90-day supply can lower the per-dose cost. Any dose change is a prescriber conversation, not a DIY split.",
    },
  ],
  "product-forms": [
    {
      q: "How can I tell if a peptide or ED drug is legitimate?",
      a: "The form is a tell. A licensed-pharmacy lyophilized vial, or a properly reconstituted product, says something very different from a pre-mixed baggie about whether anyone licensed stood behind its quality.",
    },
    {
      q: "Is gray-market pre-mixed product safe?",
      a: "A pre-mixed baggie means no verifiable source, purity, or dose — the opposite of what a licensed pharmacy provides. The form itself reveals the risk.",
    },
  ],
  "ed-workup": [
    {
      q: "How is erectile dysfunction diagnosed?",
      a: "With a systematic workup — a detailed history, a focused physical exam, and blood work — aimed at finding the cause, because the cause decides the treatment. Most men never need more than that.",
    },
    {
      q: "What tests will a doctor run for ED?",
      a: "A history and exam, plus labs like morning testosterone, blood sugar, and lipids. Specialized tests such as a penile ultrasound are reserved for specific situations, not routine cases.",
    },
    {
      q: "Do I need a workup, or can I just buy the pills?",
      a: "The workup is the part actually worth paying for — it is the screen that can catch diabetes or heart disease early. Skipping it risks treating the wrong problem and missing a bigger one.",
    },
  ],
  "premature-ejaculation": [
    {
      q: "Is premature ejaculation treatable?",
      a: "Yes, often well — with behavioral techniques, topical anesthetics, and prescription options, frequently combined. It is common and medical, not a character flaw.",
    },
    {
      q: "What causes premature ejaculation?",
      a: "Lifelong PE tends to reflect how the ejaculatory reflex is wired. Acquired PE is a change with a treatable driver behind it — often anxiety, a thyroid issue, or erectile trouble.",
    },
    {
      q: "Are premature ejaculation and ED connected?",
      a: "Frequently. When erections are unreliable, the body learns to rush — so treating the underlying erectile dysfunction often eases the premature ejaculation too.",
    },
  ],
  "peyronies-disease": [
    {
      q: "Is Peyronie's disease cancer or dangerous?",
      a: "It is not cancer and not an infection — it is a fibrous scar, or plaque, that causes curvature. It is common and treatable, and the key is matching treatment to the phase.",
    },
    {
      q: "Can Peyronie's disease be treated without surgery?",
      a: "Once it is stable, non-surgical options include injections such as collagenase and traction therapy. During the active phase, the priority is usually to let it settle before making permanent decisions.",
    },
    {
      q: "When should I see a doctor about penis curvature?",
      a: "A new curve, pain with erections, or a lump you can feel is worth a urologist — especially since Peyronie's often travels with erectile dysfunction.",
    },
  ],
  "pde5-lineup": [
    {
      q: "What is the difference between Viagra and Cialis?",
      a: "Mostly duration. Sildenafil (Viagra) lasts a few hours; tadalafil (Cialis) can cover most of a day and also comes as a low daily dose. They are more alike than different.",
    },
    {
      q: "Which ED pill lasts the longest?",
      a: "Tadalafil, by a wide margin — up to about 36 hours, versus a few hours for the others. That long window is its defining feature.",
    },
    {
      q: "Can you take ED pills with nitrates or poppers?",
      a: "No. Combining any PDE5 inhibitor with nitrates or recreational poppers can drop blood pressure to a dangerous level. It is the one hard rule they all share.",
    },
  ],
  "training-for-erections": [
    {
      q: "Can exercise improve erectile function?",
      a: "Yes — it is well established, especially moderate-to-vigorous aerobic exercise, which improves the vascular system erections depend on. The benefit is largest for the men who start off worst.",
    },
    {
      q: "Is high-intensity or weight training good for erections?",
      a: "Interval training sharpens the endothelial function erections ride on; resistance work helps the metabolic drivers like insulin sensitivity and body composition. Because ED can signal heart disease, get cleared before ramping up intensity.",
    },
    {
      q: "How does exercise actually help erections?",
      a: "Hard training raises nitric-oxide availability and improves how arteries dilate on demand — the same pathway ED pills amplify, except built rather than borrowed for a night.",
    },
  ],
  enhancement: [
    {
      q: "Do penis enlargement methods actually work?",
      a: "Almost nothing safely and permanently enlarges. Pumps help erections rather than size, traction has modest length evidence, most exercises do not work, and some injections cause permanent injury.",
    },
    {
      q: "Are penis fillers or injections safe?",
      a: "Temporary hyaluronic-acid filler placed by a qualified provider carries some, not zero, risk. Gray-market silicone or oil injections are the dangerous end — with documented necrosis, deformity, and permanent damage.",
    },
    {
      q: "Do BPC-157, TB-500, or HGH make your penis bigger?",
      a: "No. There is no human evidence for it. These are unapproved, gray-market compounds, and self-injecting them into genital tissue adds infection and injury risk with no proven upside.",
    },
    {
      q: "Is jelqing effective or safe?",
      a: "There is no credible evidence it adds lasting size, and a real record of bruising and scarring. Connective tissue heals toward scar — the raw material of curvature — not length.",
    },
  ],
};
