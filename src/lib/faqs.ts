/**
 * Per-article FAQs. Rendered as a visible "Common questions" section AND
 * emitted as FAQPage JSON-LD from the same source (Google requires the Q&A to
 * be visible on the page). Answers are plain text: concise, evidence-consistent
 * with the article, on a harm-reduction footing (numbers where published
 * handouts already carry them, framed as literacy, never as a do-it-yourself
 * instruction).
 */
export type Faq = { q: string; a: string };

export const faqs: Record<string, Faq[]> = {
  "free-testosterone": [
    {
      q: "What is free testosterone?",
      a: "Most testosterone in your blood is bound (tightly to SHBG and loosely to albumin) and unavailable to tissues. Free testosterone is the small fraction (usually around 1.5–2.5% of total) circulating unbound. Bioavailable testosterone is that free fraction plus the loosely albumin-bound portion your body can still use.",
    },
    {
      q: "Why calculate free testosterone instead of using total testosterone?",
      a: "Because SHBG changes the gap between them. When SHBG is high, total testosterone can look normal while the usable free fraction is low; when SHBG is low, the reverse. Calculated free testosterone estimates the usable fraction from total T, SHBG, and albumin: often closer to how you actually feel than the total alone.",
    },
    {
      q: "How accurate is the Vermeulen calculation?",
      a: "For most people it tracks well with the gold-standard equilibrium dialysis, and it is more reliable than the older direct 'analog' free-testosterone immunoassays. It is still an estimate. Labs and calculators use slightly different binding constants, so use it as context for a conversation with your clinician, not as a diagnosis.",
    },
    {
      q: "What albumin value should I use?",
      a: "If you don't have an albumin result, the standard default of 4.3 g/dL (43 g/L) is fine. Albumin varies little between healthy people and changes the result only modestly. If you have your own value, use it.",
    },
    {
      q: "What is a normal free testosterone level?",
      a: "Reference ranges vary by lab, assay, and age, which is why there is no single cutoff here. Bring the number to a clinician who can read it against your total testosterone, your symptoms, and the lab's own range.",
    },
    {
      q: "Are my numbers stored or sent anywhere?",
      a: "No. The calculator runs entirely in your browser, and nothing you enter is saved or transmitted.",
    },
  ],
  "erectile-function-score": [
    {
      q: "What is a normal score on this test?",
      a: "A score of 22 to 25 out of 25 falls in the range that does not indicate erectile dysfunction. 17–21 suggests mild difficulty, 12–16 mild-to-moderate, 8–11 moderate, and 5–7 severe. The score is a starting point for a conversation with a clinician, not a diagnosis.",
    },
    {
      q: "Is this the same as the SHIM or IIEF-5?",
      a: "Yes. This is the five-item International Index of Erectile Function (IIEF-5), also called the Sexual Health Inventory for Men (SHIM): a validated screening questionnaire developed by Rosen and colleagues in 1999 and used widely in clinical practice.",
    },
    {
      q: "Does a low score mean something is wrong with my heart?",
      a: "Not on its own, but it can be an early flag. Erectile tissue depends on healthy blood flow, so erectile difficulty sometimes appears years before a vascular or metabolic problem is diagnosed. That is a reason to get a workup, which also screens for those risks.",
    },
    {
      q: "Are my answers saved or sent anywhere?",
      a: "No. The questionnaire runs entirely in your browser and your answers never leave your device. Nothing is stored or transmitted.",
    },
    {
      q: "I got a reassuring score but something still feels off. What now?",
      a: "Trust that. The screen is a snapshot of the last six months, not a full evaluation. If something feels wrong, a workup is still the way to be sure. The score doesn't override your own experience.",
    },
  ],
  "erectile-function-signal": [
    {
      q: "Is erectile dysfunction a sign of heart disease?",
      a: "Often, yes. The penile arteries are small, so they tend to stiffen and narrow earlier than the coronary ones, which is why erectile trouble can precede a heart attack by years. It is a reason to get a full workup, not just a prescription.",
    },
    {
      q: "Can ED be an early warning of diabetes?",
      a: "It can. Erectile function and metabolic disease share the same small vessels and nerves, and high blood sugar damages both: sometimes before diabetes has been formally diagnosed.",
    },
    {
      q: "Should I see a doctor for occasional erection problems?",
      a: "A one-off is usually nothing. A persistent change is worth an evaluation, because it can flag vascular or metabolic problems that are far better caught early.",
    },
  ],
  "read-your-labs": [
    {
      q: "What blood tests are done for erectile dysfunction?",
      a: "Typically an early-morning testosterone (repeated if it is low), blood sugar or HbA1c, a lipid panel, and sometimes thyroid or prolactin: screening the hormonal and metabolic drivers at the same time.",
    },
    {
      q: "What counts as a normal testosterone level?",
      a: "Normal is a range, not a number to maximize. A deficiency diagnosis rests on two low early-morning readings plus real symptoms, interpreted by a clinician against the rest of your labs. Never on a single value.",
    },
    {
      q: "What is SHBG on a testosterone panel?",
      a: "SHBG (sex hormone-binding globulin) is a protein that binds testosterone and keeps it in reserve. It explains why total and free testosterone can tell different stories, which is why both are worth reading together.",
    },
  ],
  "testosterone-therapy": [
    {
      q: "Is testosterone replacement therapy safe?",
      a: "When it treats a real, diagnosed deficiency and is monitored, TRT is legitimate, unglamorous medicine. The risk comes from skipping the diagnosis or the monitoring: hematocrit, PSA, and estradiol are watched to keep it safe.",
    },
    {
      q: "What is the difference between TRT and anabolic steroids?",
      a: "TRT restores a diagnosed deficiency back to a normal range under monitoring. Stacking anabolic steroids on top is supraphysiological enhancement, a different, higher-risk practice, and the line this site draws.",
    },
    {
      q: "Does testosterone therapy affect fertility?",
      a: "It can suppress sperm production, which matters if you may want children. That is a conversation to have with your prescriber before starting, not after.",
    },
  ],
  "pde5-long-term": [
    {
      q: "Do ED pills stop working over time?",
      a: "Usually the drug has not worn out: your vasculature has changed. A fading response is often a signal to re-check vascular and metabolic health rather than simply chase the effect.",
    },
    {
      q: "Can you take PDE5 inhibitors every day?",
      a: "Low-dose daily tadalafil is a recognized option that keeps continuous coverage. Whether daily or as-needed suits you is a prescriber's call.",
    },
    {
      q: "Which blood pressure medications work best with ED?",
      a: "Some, such as nebivolol or telmisartan, tend to be more erection-friendly than older options, worth raising if you are treating both high blood pressure and ED.",
    },
  ],
  "apomorphine-troches": [
    {
      q: "What is apomorphine and how does it work for ED?",
      a: "Apomorphine is a dopamine agonist, not an opioid. It acts in the brain, mainly on D2 receptors in the hypothalamus, sending a pro-erectile signal from the top down. That makes it a central lever, unlike PDE5 inhibitors such as sildenafil and tadalafil, which work peripherally on penile blood flow.",
    },
    {
      q: "Why was Uprima (sublingual apomorphine) taken off the market?",
      a: "Uprima was approved in Europe in 2001 but produced erections firm enough for intercourse in only about half of attempts, clearly weaker than PDE5 inhibitors, while nausea was common enough to drive men off the drug and rare fainting raised safety concerns. The US application was withdrawn and the product was later discontinued in Europe.",
    },
    {
      q: "Is the sildenafil-tadalafil-apomorphine troche FDA-approved?",
      a: "No. The three-drug combination has never been through a clinical trial, and apomorphine has never been FDA-approved for erectile dysfunction. The troches are compounded prescription products, which is a legal channel but one that does not require efficacy evidence for the combination.",
    },
    {
      q: "Do sublingual ED troches work faster than pills?",
      a: "Somewhat, and less than the marketing implies. Sublingual absorption can shorten onset for part of the dose, but much of a troche is still swallowed and absorbed like a pill. The reliability users report tracks the large PDE5-inhibitor doses inside, not the delivery format.",
    },
    {
      q: "Does Proviron (mesterolone) improve erections?",
      a: "There are decades of consistent first-person reports of improved desire and erection quality, and a plausible mechanism through androgen-receptor binding and lower SHBG, but no modern clinical trials. Mesterolone is not FDA-approved and is a controlled substance in the US. The legitimate version of that signal is having your androgen status properly evaluated by a clinician.",
    },
  ],
  "bremelanotide-pde5": [
    {
      q: "What is the difference between bremelanotide and Viagra?",
      a: "They pull different levers: bremelanotide acts on desire in the brain, while PDE5 inhibitors act on the erection itself. That is why combining them has pharmacological logic, though bremelanotide is off-label in men.",
    },
    {
      q: "Is bremelanotide safe to combine with ED pills?",
      a: "The combination is early-stage and off-label in men, and bremelanotide raises blood pressure, so it is a careful, prescriber-supervised conversation. Most of what is sold online is not the approved drug.",
    },
  ],
  "urologist-visit": [
    {
      q: "What should I expect at a urologist appointment for ED?",
      a: "A real evaluation follows a known sequence: a detailed history (which situations fail and which don't), a physical exam, and blood work. Imaging like a penile Doppler ultrasound is a specialized add-on for specifically vascular questions, not a routine step. If the visit is two questions and a prescription with no labs and no stated diagnosis, the evaluation was skipped and you can ask why.",
    },
    {
      q: "What should I tell the urologist before a penile Doppler ultrasound?",
      a: "Exactly what you already take and what it actually takes to give you a full, reliable erection, with no rounding and nothing left out. The test uses an in-office injection, and if the dose isn't adequate for your physiology the scan can show a venous leak that isn't really there. Your precise history is what lets the clinician dose and interpret the study correctly.",
    },
    {
      q: "How much does a penile Doppler ultrasound cost?",
      a: "Patients commonly report anywhere from a few hundred dollars to around a thousand for the same test, depending on the facility and how it bills. Ask for the cash price and the insurance price before you consent; imaging is one of the most shoppable services in medicine, and prices vary far more than quality does.",
    },
    {
      q: "What results should I ask for after an ED workup?",
      a: "Actual numbers, not summaries. From a Doppler: PSV, EDV, and RI for both the right and left sides. From blood work: the values and reference ranges. And from the visit itself: a stated working diagnosis, even if it's 'we don't know yet.' Ask for copies of the full reports before you leave; portal summaries often omit the numbers.",
    },
    {
      q: "What if the doctor just prescribes Viagra without any workup?",
      a: "A PDE5 inhibitor can be a reasonable first treatment, but only after someone actually evaluated you, since ED can be the first visible sign of a vascular or metabolic problem. Ask why this treatment before an answer, how you'll know it's working, and when you'll re-check. If those questions never get real answers, a second opinion is routine and reasonable.",
    },
    {
      q: "How do I get the most out of a urologist visit for ED?",
      a: "Walk in as a participant, not throughput. Bring written notes (which situations fail, when it started, every medication, any labs), be precise about what you take before any test, ask costs before consenting to one, and ask why, how, and when at the treatment step. Then leave with the actual numbers (PSV, EDV, and RI for both sides from a Doppler, values and ranges from blood work), copies of the full reports, and a stated working diagnosis.",
    },
  ],
  "telemedicine-visit": [
    {
      q: "How do I know if an online men's health clinic is legitimate?",
      a: "The test is whether anyone actually evaluated you (a real history, labs when warranted, and follow-up) versus a checkout form with a doctor's signature stapled on.",
    },
    {
      q: "What are the red flags of an ED pill mill?",
      a: "No real evaluation, no labs, no monitoring, and a prescription in ninety seconds. A good visit bridges you toward care; a pill mill just sells.",
    },
  ],
  "what-it-costs": [
    {
      q: "Why is ED treatment so expensive?",
      a: "The price is a stack (labs, a consult, the product, and markup on top), and the prescriber's cut often hides in the middle. Seeing the layers is how you find the real value.",
    },
    {
      q: "How can I get ED treatment for less?",
      a: "The generic molecules cost close to nothing at transparent pharmacies. The value is in paying less for the same legitimate, monitored care. Never in cutting the diagnosis, prescription, or labs that keep you safe.",
    },
  ],
  "generic-pde5-value": [
    {
      q: "Is generic sildenafil as good as Viagra?",
      a: "It is the same molecule. The gap between a few dollars and a few hundred is markup, not medicine: the patent expired years ago.",
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
      a: "A pre-mixed baggie means no verifiable source, purity, or dose: the opposite of what a licensed pharmacy provides. The form itself reveals the risk.",
    },
  ],
  "nocturnal-tumescence-testing": [
    {
      q: "What is nocturnal penile tumescence (NPT) testing?",
      a: "NPT testing measures the erections that happen naturally during sleep, mostly in REM. Healthy men typically have several a night without being aware of them. The test records whether they occur and how rigid they are, because their presence points to intact nerves and blood flow, regardless of what happens when you're awake.",
    },
    {
      q: "What does an NPT test tell you about ED?",
      a: "It helps separate a physical cause from a psychological one. If strong erections happen reliably in your sleep but not during sex, the hardware is largely working and the barrier is more likely psychological or situational. If they're weak or absent asleep too, that points toward a physical (vascular, neurological, or hormonal) cause worth pursuing. It's a pointer, not a diagnosis on its own.",
    },
    {
      q: "How is NPT testing done, and can I do it at home?",
      a: "There are two levels. The formal version is RigiScan, a device worn overnight (sometimes in a sleep lab) that continuously logs the number, rigidity, and duration of erections. A simpler screening version uses a snap-gauge or postage-stamp-style band around the shaft that breaks if an erection occurs: cheap and doable at home, but it only tells you something happened, not how rigid or how long. Which one fits is a clinician's call.",
    },
    {
      q: "Is NPT testing still used?",
      a: "Less than it once was. A good history, exam, and blood work answer the physical-versus-psychological question for most men, and treatment often moves ahead without it. NPT keeps a role in specific situations (younger men, complex or unclear cases, or medico-legal ones), but it's a selective tool now, not a routine step.",
    },
  ],
  "penile-doppler-ultrasound": [
    {
      q: "What is a penile Doppler ultrasound and what does it show?",
      a: "It is an ultrasound of the arteries and veins in the penis, done after an injection that produces an erection, so the clinician can measure blood flow directly. It shows whether enough blood flows in (arterial inflow) and whether it stays in (venous leak), the two vascular questions pills can't answer. It's a specialized test, not a routine one; most men never need it.",
    },
    {
      q: "How much does a penile Doppler ultrasound cost?",
      a: "It varies widely by location and setting: commonly a few hundred to around a thousand dollars. Ask for the price and whether your insurance covers it before you book, and confirm whether a follow-up contrast study would be billed separately.",
    },
    {
      q: "Why does the injection dose matter for the result?",
      a: "The test needs a full erection to measure blood flow accurately. If the in-office injection doesn't fully engage the erection, the study can show a venous leak that wouldn't appear at a proper dose. A false positive. That's why it's worth telling the clinician exactly what you normally use to achieve a reliable erection, so the study reflects your real physiology rather than an under-dosed snapshot.",
    },
    {
      q: "What is cavernosography and when is it used?",
      a: "Cavernosography is a follow-up test that uses injected contrast dye and imaging to see venous leak more clearly: think of it like the difference between imaging with and without contrast. It's more invasive, so it's usually reserved for when the Doppler is inconclusive or a leak needs to be mapped before considering surgery.",
    },
    {
      q: "What are PSV, EDV, and RI on a penile Doppler report?",
      a: "They're the core measurements. PSV (peak systolic velocity) reflects arterial inflow. Higher is better. EDV (end-diastolic velocity) reflects whether blood is draining back out. Lower is better. RI (resistive index) combines the two. Ask for all three for both the right and left sides, because a normal result on one side doesn't rule out a problem on the other. The specific numbers are interpreted by your clinician against the lab's reference values.",
    },
  ],
  cavernosography: [
    {
      q: "What is cavernosography?",
      a: "Cavernosography is an imaging test that maps venous leak in the penis. Contrast dye is injected while the penis is kept erect with a saline infusion, and X-ray or fluoroscopy shows where blood (and dye) is escaping. It's usually paired with dynamic infusion cavernosometry, which measures the pressures involved, so the two are often described together.",
    },
    {
      q: "How is cavernosography different from a penile Doppler ultrasound?",
      a: "The Doppler is the first-line vascular test: non-invasive ultrasound that measures inflow and hints at leak. Cavernosography is the more invasive follow-up, using contrast dye to show exactly where a leak is. Think of it as imaging with contrast versus without: same question, sharper and more localized picture. The Doppler almost always comes first.",
    },
    {
      q: "When is cavernosography needed?",
      a: "Rarely, and only for specific reasons, most often when the Doppler suggests venous leak and a man is a candidate for surgery, so the surgeon needs to know precisely where the leak is. It's not part of a routine ED workup and most men never need it.",
    },
    {
      q: "Does cavernosography change the treatment?",
      a: "Only in a narrow set of cases. Venous leak surgery has a limited and often disappointing track record, so mapping a leak is worthwhile mainly when it will genuinely guide a procedure. For most men, effective treatment (pills, injections, a vacuum device, or an implant) doesn't depend on this level of detail. That's a conversation to have with a urologist before agreeing to the test.",
    },
  ],
  "ed-workup": [
    {
      q: "How is erectile dysfunction diagnosed?",
      a: "With a systematic workup (a detailed history, a focused physical exam, and blood work) aimed at finding the cause, because the cause decides the treatment. Most men never need more than that.",
    },
    {
      q: "What tests will a doctor run for ED?",
      a: "A history and exam, plus labs like morning testosterone, blood sugar, and lipids. Specialized tests such as a penile ultrasound are reserved for specific situations, not routine cases.",
    },
    {
      q: "Do I need a workup, or can I just buy the pills?",
      a: "The workup is the part actually worth paying for: it is the screen that can catch diabetes or heart disease early. Skipping it risks treating the wrong problem and missing a bigger one.",
    },
  ],
  "premature-ejaculation": [
    {
      q: "Is premature ejaculation treatable?",
      a: "Yes, often well: with behavioral techniques, topical anesthetics, and prescription options, frequently combined. It is common and medical, not a character flaw.",
    },
    {
      q: "What causes premature ejaculation?",
      a: "Lifelong PE tends to reflect how the ejaculatory reflex is wired. Acquired PE is a change with a treatable driver behind it, often anxiety, a thyroid issue, or erectile trouble.",
    },
    {
      q: "Are premature ejaculation and ED connected?",
      a: "Frequently. When erections are unreliable, the body learns to rush, so treating the underlying erectile dysfunction often eases the premature ejaculation too.",
    },
  ],
  "psychogenic-ed": [
    {
      q: "What is psychogenic erectile dysfunction?",
      a: "Erectile trouble driven mainly by the mind and nervous system rather than damaged plumbing. Anxiety, stress, or a bad past experience triggers the fight-or-flight response, which physically works against an erection. The vasculature can be intact and it still fails, which is why it is real, not imagined.",
    },
    {
      q: "How do I know if my ED is psychological or physical?",
      a: "The pattern is the biggest clue. Psychogenic ED tends to be situational: fine alone or on waking but failing with a partner, or fine with one partner but not another, often starting suddenly. Physical causes usually come on gradually and are present in every situation. Only a workup, including overnight erection testing, settles it, and the two often overlap.",
    },
    {
      q: "Is performance anxiety a real medical cause of ED?",
      a: "Yes. An erection needs the parasympathetic 'rest and digest' state to happen. Anxiety activates the opposite, the sympathetic fight-or-flight system, which constricts blood flow and blocks it. The fear itself is the mechanism, so calling it 'all in your head' misses that the effect on the body is physical.",
    },
    {
      q: "What is spectatoring?",
      a: "Mentally stepping outside the moment to watch and judge your own performance instead of staying present. It reliably triggers the anxiety response that causes the failure you are watching for, which is how one bad experience turns into a self-feeding loop. Breaking that loop is a core aim of sex therapy.",
    },
    {
      q: "Can it be both anxiety and blood flow at the same time?",
      a: "Very often, especially past 40. A psychogenic pattern that started young can still be running while age-related changes in blood flow layer on top, and each feeds the other. That is why a proper evaluation checks both instead of assuming one, and why treating both halves works better than chasing one.",
    },
    {
      q: "What actually treats psychogenic ED?",
      a: "Sex therapy or CBT with a licensed clinician is the highest-yield option, alongside mindfulness and open communication with a partner. A PDE5 inhibitor can help short-term as a confidence bridge that overwrites the failure memory, prescribed and tapered by a clinician. It responds well to treatment, and rarely to a pill alone.",
    },
  ],
  "peyronies-disease": [
    {
      q: "Is Peyronie's disease cancer or dangerous?",
      a: "It is not cancer and not an infection. It is a fibrous scar, or plaque, that causes curvature. It is common and treatable, and the key is matching treatment to the phase.",
    },
    {
      q: "Can Peyronie's disease be treated without surgery?",
      a: "Once it is stable, non-surgical options include injections such as collagenase and traction therapy. During the active phase, the priority is usually to let it settle before making permanent decisions.",
    },
    {
      q: "When should I see a doctor about penis curvature?",
      a: "A new curve, pain with erections, or a lump you can feel is worth a urologist, especially since Peyronie's often travels with erectile dysfunction.",
    },
  ],
  "pde5-lineup": [
    {
      q: "What is the difference between Viagra and Cialis?",
      a: "Mostly duration. Sildenafil (Viagra) lasts a few hours; tadalafil (Cialis) can cover most of a day and also comes as a low daily dose. They are more alike than different.",
    },
    {
      q: "Which ED pill lasts the longest?",
      a: "Tadalafil, by a wide margin: up to about 36 hours, versus a few hours for the others. That long window is its defining feature.",
    },
    {
      q: "Can you take ED pills with nitrates or poppers?",
      a: "No. Combining any PDE5 inhibitor with nitrates or recreational poppers can drop blood pressure to a dangerous level. It is the one hard rule they all share.",
    },
  ],
  "training-for-erections": [
    {
      q: "Can exercise improve erectile function?",
      a: "Yes. It is well established, especially moderate-to-vigorous aerobic exercise, which improves the vascular system erections depend on. The benefit is largest for the men who start off worst.",
    },
    {
      q: "Is high-intensity or weight training good for erections?",
      a: "Interval training sharpens the endothelial function erections ride on; resistance work helps the metabolic drivers like insulin sensitivity and body composition. Because ED can signal heart disease, get cleared before ramping up intensity.",
    },
    {
      q: "How does exercise actually help erections?",
      a: "Hard training raises nitric-oxide availability and improves how arteries dilate on demand, the same pathway ED pills amplify, except built rather than borrowed for a night.",
    },
  ],
  "trt-fertility": [
    {
      q: "Does TRT cause infertility?",
      a: "While you are on it, testosterone therapy usually suppresses sperm production, often to very low or zero levels: about two-thirds of men by four to six months. But for most men it is not a real-world problem: they are not trying to conceive, and the effect is usually reversible after stopping.",
    },
    {
      q: "Is TRT-related infertility reversible?",
      a: "Usually, yes. After stopping, sperm counts typically recover over several months (roughly 90% of men by a year and effectively all by two years), though older men and those on TRT longer recover more slowly. Planning ahead beats hoping.",
    },
    {
      q: "Can you stay fertile while on testosterone therapy?",
      a: "Often, yes. Adding low-dose hCG keeps the testicles working alongside TRT, and a medication like enclomiphene raises your own testosterone without shutting sperm down. Which fits is a prescriber's call, ideally made before you start.",
    },
  ],
  "penile-injections": [
    {
      q: "What is trimix for ED?",
      a: "Trimix is a compounded medication (alprostadil, papaverine, and phentolamine) injected into the penis to produce an erection directly, bypassing the desire and nerve pathways pills rely on, which is why it works even when pills don't. It is a prescription second-line treatment via a urologist and a licensed compounding pharmacy.",
    },
    {
      q: "Are penile injections for ED safe?",
      a: "In a monitored program, yes. The main risk is a prolonged erection (priapism), which is why the dose is set carefully by a clinician and the first one is done in the office. An erection lasting more than four hours is an emergency, but it happens in only about 0.5 to 5% of users.",
    },
    {
      q: "What is a typical trimix dose?",
      a: "Standard programs start at 0.05 mL (5 units on the syringe) and increase in 0.05 mL steps under a prescriber's direction, with the first injection given in the office. Most trimix vials are mixed at papaverine 30 mg/mL, phentolamine 1 mg/mL, and alprostadil 10 to 40 mcg/mL. The right dose is individual: the one that produces an erection firm enough for intercourse lasting under an hour.",
    },
    {
      q: "How often can you use trimix?",
      a: "No more than three times per week, with at least 24 hours between injections. That limit is in the drug labeling itself and exists to protect the tissue from fibrosis and to keep the dose-response honest.",
    },
    {
      q: "Why can't I adjust my trimix dose myself?",
      a: "Because priapism risk rises with dose and the curve is steep: the same mechanism that makes injections reliable, bypassing arousal entirely, means an overshoot has no natural brake. Titration happens under supervision, and an erection lasting longer than your prescriber's target is a signal to lower the dose, not push through it.",
    },
    {
      q: "How is a prolonged erection from trimix reversed?",
      a: "The standard rescue ladder starts with ice to the perineum and walking, then oral pseudoephedrine 30 mg (or diphenhydramine), then prescriber-directed rescue medication such as terbutaline or injected phenylephrine. If the erection reaches four hours, the ER reverses it by aspirating the trapped blood and injecting phenylephrine in repeated small doses, with a surgical shunt if that fails. Full protocol: the Support page.",
    },
    {
      q: "What can I do if ED pills don't work?",
      a: "Pills failing isn't the end of the road. Penile injections are the most effective second line, vacuum devices are a drug-free option, and a penile implant is the definitive fix when nothing else works. It's a urology conversation, not a dead end.",
    },
  ],
  "priapism-clock": [
    {
      q: "How long can an erection last before it causes damage?",
      a: "The emergency line is four hours: beyond that, an erection is ischemic priapism by definition, with trapped, oxygen-starved blood. Tissue damage starts earlier than most men think: smooth muscle changes can begin around six hours, necrosis and fibrosis are underway by twelve to twenty-four, and past thirty-six hours the likelihood of recovering erectile function is low.",
    },
    {
      q: "What happens to the penis during priapism?",
      a: "The outflow valves stay clamped, so the blood that built the erection is trapped and cut off from the lungs. It becomes hypoxic and acidotic, the smooth muscle that runs erections begins to die, and the body replaces it with scar tissue (fibrosis). That scarring is what causes the permanent erectile dysfunction and penile shortening.",
    },
    {
      q: "Is a 3-hour erection an emergency?",
      a: "It's the gray zone, called a prolonged erection. The rescue steps (ice, walking, the OTC and prescriber-directed options in standard handouts) still have their best chance here. If it reaches four hours it is a full emergency: go to the ER rather than keep trying home steps.",
    },
    {
      q: "Can you recover erectile function after priapism?",
      a: "Usually, if it's reversed early: aspiration plus phenylephrine resolves 71 to 93% of events, preserving function in 70 to 92% of patients. The odds fall steeply with time: in one study, more than half of men with 24 to 48 hours of priapism had permanent ED, and past 36 hours the guideline counsels that recovery is unlikely.",
    },
    {
      q: "Why does waiting make treatment harder, not just riskier?",
      a: "Because time changes which tools work. Acidotic smooth muscle stops responding to phenylephrine, clotting defeats simple drainage, and late fixes like surgical shunts often leave erectile dysfunction anyway. Early reversal is a needle and an afternoon; late reversal is surgery with a poor functional prognosis.",
    },
  ],
  "cialis-pre-workout": [
    {
      q: "Does Cialis (tadalafil) improve gym performance?",
      a: "The evidence says mostly no. A randomized trial in trained athletes found no effect of 20 mg tadalafil on sprint power, the largest PDE5-inhibition exercise trial (RELAX) found no improvement in exercise capacity, and WADA-funded altitude research found no benefit for most athletes below about 4,000 meters. What the drug does deliver is a visible muscle pump, which is a cosmetic effect, not a performance one.",
    },
    {
      q: "Why do bodybuilders take tadalafil before training?",
      a: "For the pump: PDE5 inhibitors widen blood vessels wherever the enzyme appears, including the vessels feeding working muscle, and tadalafil's 17.5-hour half-life keeps the vasodilation going long after the session. The effect is real but cosmetic: extra blood and fluid in the muscle, not extra strength, reps, or growth.",
    },
    {
      q: "Can you take tadalafil with pre-workout supplements?",
      a: "It's the risky part of the trend. Many pre-workouts stack nitric-oxide boosters (citrulline, arginine, beetroot) that lower blood pressure on the same pathway the drug acts on, so the effects add together. Heavy straining on top of a lowered resting pressure is how a lift ends in lightheadedness under a loaded bar. No one has measured the combinations, which is the problem.",
    },
    {
      q: "How long after tadalafil is nitroglycerin unsafe?",
      a: "In the dedicated interaction study, blood pressure responses to nitroglycerin were still dangerously amplified 24 hours after a tadalafil dose and only normalized around 48 hours out, which is why the label's nitrate guidance is longer than for shorter-acting drugs like sildenafil. If you've taken tadalafil and develop chest pain, tell the medics exactly what you took and when.",
    },
    {
      q: "Is the tadalafil pump muscle growth?",
      a: "No. A pump is transient cell swelling from extra blood and fluid, and nothing shows tadalafil adds muscle tissue. It looks good in the mirror and feels significant, which is why the trend persists, but it resolves as the drug wears off. The growth signal still comes from progressive training, nutrition, and recovery.",
    },
  ],
  "death-grip": [
    {
      q: "Is death grip syndrome a real medical condition?",
      a: "Not as an official diagnosis, no. But the underlying phenomenon is documented in sexual-medicine literature: delayed orgasm or anorgasmia with a partner, linked to vigorous, idiosyncratic masturbation technique that a partner can't replicate. The slang names the cause; medicine names the effect, delayed ejaculation, and treats it.",
    },
    {
      q: "Can masturbating too much make you unable to finish with a partner?",
      a: "Frequency alone isn't the mechanism, specificity is. A grip, pace, or context practiced for years can raise the stimulation threshold until partnered sex can't reach it. The tell-tale pattern is fast, easy climax solo but slow or impossible with a partner. It's a learned pattern, which means it can be unlearned.",
    },
    {
      q: "How do you fix death grip syndrome?",
      a: "The fixes are behavioral, because there are no approved drugs for delayed ejaculation: a two-to-three-week reset, then progressive reshaping of technique toward partnered sensations (looser grip, lubricant, slower pace, switching hands), sometimes with vibratory stimulation, which restored orgasm in 72% of men in one trial. If the pattern fits, give it weeks to months.",
    },
    {
      q: "Does masturbation cause erectile dysfunction or nerve damage?",
      a: "No credible evidence that masturbation itself damages nerves, lowers testosterone, or causes ED. The issue with an overly tight technique is sensory calibration, not injury, and calibration reverses. If you have erection problems rather than climax problems, that's a separate question with its own workup.",
    },
    {
      q: "When should I see a doctor about delayed ejaculation?",
      a: "When you can't climax solo at all, when the problem appeared suddenly alongside a new medication (SSRIs commonly delay orgasm), or when a couple of months of reshaping changes nothing. Those patterns point to medication effects, hormones, or neurology rather than habit, and a clinician can sort them.",
    },
  ],
  "stuck-cock-ring": [
    {
      q: "How long can you safely wear a cock ring?",
      a: "Thirty minutes is the standard limit from the vacuum-erection-device literature. The ring works by blocking venous outflow, so the trapped blood stops being oxygenated; past about 30 minutes the tissue goes ischemic. Stretchy novelty rings that come off with the erection are lower stakes than rigid metal ones, which keep their diameter no matter what the tissue does.",
    },
    {
      q: "What happens if a cock ring stays on too long?",
      a: "It becomes a strangulation injury on a time clock: reversible vascular congestion, then lymphedema, loss of sensation, ischemic skin necrosis, urethral injury or fistula, and in the worst cases gangrene and amputation, with sepsis possible behind them. The urologic literature grades these injuries I through V, and which grade you land on is mostly a function of hours.",
    },
    {
      q: "When is a stuck cock ring an emergency?",
      a: "When there's color or temperature change beyond the ring (pale, dusky, blue, cool skin), numbness, inability to urinate, rapidly worsening swelling or pain, or simply hours of a rigid ring that won't move. Those are emergency-department signs, not another hour of home attempts.",
    },
    {
      q: "How does the ER remove a stuck metal ring?",
      a: "Standard techniques matched to the object, usually under local anesthetic or sedation: soft rings get cut; rigid rings come off by decompression, aspirating trapped blood from the corpora to shrink the tissue, often combined with the string method that compresses edema down the shaft so the ring slides over it. Cutting tools are a last resort for stubborn metal, and hospitals have the ones that work without burning tissue.",
    },
    {
      q: "Is it embarrassing to go to the ER for this?",
      a: "That's the variable the case literature keeps naming as what decides outcomes: patients typically arrive late, after home remedies fail, and late converts mild injuries into severe ones. Emergency teams manage this with standard techniques that go back centuries, the standard of care is fast removal, and nobody is calling anyone. The wait costs more than the visit.",
    },
  ],
  enhancement: [
    {
      q: "Do penis enlargement methods actually work?",
      a: "Almost nothing safely and permanently enlarges. Pumps help erections rather than size, traction has modest length evidence, most exercises do not work, and some injections cause permanent injury.",
    },
    {
      q: "Are penis fillers or injections safe?",
      a: "Temporary hyaluronic-acid filler placed by a qualified provider carries some, not zero, risk. Gray-market silicone or oil injections are the dangerous end, with documented necrosis, deformity, and permanent damage.",
    },
    {
      q: "Do BPC-157, TB-500, or HGH make your penis bigger?",
      a: "No. There is no human evidence for it. These are unapproved, gray-market compounds, and self-injecting them into genital tissue adds infection and injury risk with no proven upside.",
    },
    {
      q: "Is jelqing effective or safe?",
      a: "There is no credible evidence it adds lasting size, and a real record of bruising and scarring. Connective tissue heals toward scar (the raw material of curvature), not length.",
    },
  ],
};
