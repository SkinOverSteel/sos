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
  "atx-304": [
    {
      q: "What is ATX-304, also called ATX304 or O304?",
      a: "ATX-304 is an investigational oral small molecule studied for AMPK activation and mitochondrial effects in metabolic disease. It was previously studied as O304. It is not a peptide, and the developer describes it as unavailable for human use outside clinical trials.",
    },
    {
      q: "Does ATX-304 cause weight loss in humans?",
      a: "Dramatic human weight loss is not established. The developer's June 2026 report of a small Phase 1b trial in adults with obesity and prediabetes described metabolic improvements but minimal weight loss at the exposure tested. Animal fat-loss results cannot be substituted for human efficacy.",
    },
    {
      q: "Did ATX-304 increase metabolism by 8% or 33%?",
      a: "The 2026 ADA abstract reports a resting metabolic rate increase of 'up to 33%' compared with baseline; the developer's later release reports 8%. The available text does not reconcile the analysis populations, time points, or summary statistics. Neither should be presented as a guaranteed response or a placebo-adjusted effect without the corresponding analysis.",
    },
    {
      q: "Does ATX-304 improve erections or testosterone?",
      a: "Neither the older O304 TELLUS report nor the newer Phase 1b abstract establishes a benefit for erectile function or testosterone. TELLUS measured calf-muscle microvascular perfusion, not penile blood flow or an erectile-function outcome. Metabolic promise is not proof of a sexual-health benefit.",
    },
    {
      q: "Can ATX-304 preserve muscle when combined with a GLP-1 drug?",
      a: "The cited muscle-sparing combination findings are animal evidence. They do not establish human muscle retention, strength preservation, or a safe ATX-304 and GLP-1 combination regimen. A human combination trial is needed rather than a self-directed stack.",
    },
    {
      q: "Is ATX-304 approved and safe to take?",
      a: "The developer describes ATX-304 as investigational, not an approved medicine available outside trials. Early study reports describe generally mild adverse events and no increase in monitored core temperature or heart rate, but small, short studies cannot establish long-term safety, uncommon harms, or drug interactions. Research-vendor products are not validated by those trials.",
    },
  ],
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
  "treatment-cost": [
    {
      q: "How much does testosterone replacement therapy cost per month?",
      a: "The medication is the small part. A 10 mL vial of generic testosterone cypionate (200 mg/mL) lists at roughly $38–$90 cash at U.S. retail pharmacies in 2026 and lasts three to five months at typical doses. Labs, consults, and any clinic membership are what move the monthly figure from under $50 to $150–$300. The estimator adds each line up for your plan.",
    },
    {
      q: "Is testosterone cheaper through a compounding pharmacy?",
      a: "Often, yes, when the prescriber routes the script there. Prescribers who work with a compounding pharmacy typically get testosterone cypionate 10–20% under retail cash pay, and the same pharmacy can fill the ancillaries (hCG, anastrozole) and other oil-based esters or blends written on the same prescription. It is a licensed, prescription-only channel, and the estimator's compounding option models exactly that discount.",
    },
    {
      q: "Why is a telehealth ED subscription more expensive than the pharmacy?",
      a: "Because it bundles the consult and the convenience into a per-dose price for the same generic sildenafil or tadalafil. Filled at a pharmacy with a discount card, generic tablets commonly run a dollar or two each; bundled per-dose prices are usually several times that. Switching the channel in the estimator shows the difference.",
    },
    {
      q: "Do the defaults apply outside the United States?",
      a: "No. The defaults are U.S. cash prices. Every field is editable, so enter your own local quotes and the arithmetic still works.",
    },
    {
      q: "Are my numbers stored or sent anywhere?",
      a: "No. The estimator runs entirely in your browser, and nothing you enter is saved or transmitted.",
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
  "shockwave-therapy": [
    {
      q: "Does shockwave therapy work for erectile dysfunction?",
      a: "Sham-controlled trials and meta-analyses show a modest average improvement, roughly 2 to 4 points on the erectile function score, mainly in men with mild to moderate vascular ED. That is a real signal, not a cure, and some sham-controlled trials found no benefit. Professional guidelines still classify it as investigational.",
    },
    {
      q: "How long do the effects of shockwave therapy for ED last?",
      a: "In the largest follow-up study, about two-thirds of men responded initially and roughly half of those responders still had the benefit at two years. Men with milder ED and no diabetes held their gains best; men with severe ED and diabetes lost them.",
    },
    {
      q: "Is GAINSWave the same as the shockwave therapy in the studies?",
      a: "Not necessarily. The published trials used focused low-intensity shockwave devices at controlled energy settings. Many clinics and med-spas use radial pressure wave machines, which are physically different and far less studied. Ask which device is used and whether it is a focused unit.",
    },
    {
      q: "How much does shockwave therapy for ED cost, and is it covered by insurance?",
      a: "In the US a course typically runs from about $2,000 to $6,000 cash across 6 to 12 sessions. Insurance does not cover it because it remains investigational. That is why guideline societies say it should be offered inside a trial or with clear informed consent about the evidence.",
    },
    {
      q: "Is shockwave therapy safe for the penis?",
      a: "At the low intensities studied, the trials report essentially no adverse events beyond mild discomfort during treatment. The risk is financial and opportunity cost, not injury, as long as it is not substituted for a cardiometabolic workup of the ED itself.",
    },
    {
      q: "Does shockwave therapy help Peyronie's disease?",
      a: "It reduces plaque pain in a randomized trial but does not reduce curvature. Guidelines allow it for pain only. For straightening, collagenase injections, traction, and surgery are the evidence-based options.",
    },
  ],
  "post-prostatectomy-rehabilitation": [
    {
      q: "How long does it take for erections to come back after prostatectomy?",
      a: "Recovery runs on the nerves' timetable, typically 12 to 24 months after nerve-sparing surgery, with most gains in the first year. Age, erectile function before surgery, and how completely the nerves were spared are the biggest predictors. Some men never fully recover unassisted erections, and an implant remains an option.",
    },
    {
      q: "Does daily Cialis after prostatectomy help erections recover?",
      a: "Daily tadalafil improves erections while you take it and reduced penile length loss in a large trial, but trials have not shown it speeds the return of unassisted erections once it is stopped. Guidelines say clinicians should discuss rehabilitation; the evidence for any single protocol is limited.",
    },
    {
      q: "What is penile rehabilitation after prostate surgery?",
      a: "A program to keep the erectile tissue oxygenated and stretched while the nerves heal, so that it does not scar and shrink. Tools include PDE5 inhibitors, a vacuum erection device, penile injections if pills do not work, and pelvic floor muscle training, usually started within the first weeks after surgery.",
    },
    {
      q: "Can pelvic floor exercises improve erectile function?",
      a: "Yes, with supervision. The ischiocavernosus and bulbospongiosus muscles trap blood in the erect penis. A small randomized trial after prostatectomy found nearly four times the potency recovery at 12 months with early biofeedback-guided training, and training also reduces urine leakage at orgasm. A pelvic floor physiotherapist teaches the correct contraction; doing it wrong trains the wrong muscles.",
    },
    {
      q: "Does a vacuum device after prostatectomy prevent shrinkage?",
      a: "Small trials suggest starting daily vacuum device use about a month after surgery preserves penile length and improves erectile scores compared with waiting. It is a low-risk, guideline-mentioned part of rehabilitation, used without the constriction ring for tissue stretching.",
    },
    {
      q: "What new treatments are being studied for erections after prostatectomy?",
      a: "NeuroSAFE, a real-time margin check that lets surgeons spare more nerve tissue, improved erectile function scores at 12 months in a 2025 randomized trial. Stem cell injections, nerve grafts and amniotic membrane wraps, and low-intensity shockwave therapy are under study; shockwave added to tadalafil did not beat tadalafil alone in a randomized trial.",
    },
  ],
  "xiaflex-collagenase": [
    {
      q: "What is Xiaflex and how does it treat Peyronie's disease?",
      a: "Xiaflex is collagenase clostridium histolyticum, a bacterial enzyme that breaks down collagen. Injected directly into the Peyronie's plaque by a certified urologist, it partially dissolves the scar so the penis can be gently straightened with modeling. It is the only FDA-approved drug for Peyronie's disease.",
    },
    {
      q: "How much does Xiaflex straighten the curve?",
      a: "In the IMPRESS trials the average improvement was about 34 percent of the starting curve, roughly 17 degrees, versus about 18 percent with placebo. It reduces the curve; it does not usually make the penis straight. Bigger curves tend to lose more degrees.",
    },
    {
      q: "Who is a candidate for Xiaflex injections?",
      a: "Men with stable Peyronie's disease, a curve between 30 and 90 degrees, and erections adequate for sex. It is not approved for ventral curves, calcified plaques, plaques that involve the urethra, or an hourglass deformity without curvature, and the disease needs to have stopped changing first.",
    },
    {
      q: "What are the risks of Xiaflex for Peyronie's?",
      a: "Bruising, swelling, and pain at the site are expected in most men. The serious risk is corporal rupture, a tear of the erectile chamber, in roughly 1 in 200 men in the trials, which needs surgical repair. That is why sex is off the table for at least four weeks after each treatment cycle and why only certified prescribers can give it.",
    },
    {
      q: "How many Xiaflex injections are needed and how long does treatment take?",
      a: "The approved course is up to four cycles of two injections each, one to three days apart, with cycles about six weeks apart: up to eight injections over roughly six months. Many urologists now use shortened protocols with fewer visits, and traction is often added between cycles.",
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
  "semen-retention": [
    {
      q: "Does holding semen for 7 days raise testosterone?",
      a: "That claim comes from a single 2003 study of 28 men reporting a day-seven peak at 145.7% of baseline. The journal retracted the paper in December 2021 for duplicate publication, the finding was never replicated, and even the original authors reported no sustained elevation after the peak. It is best treated as a viral footnote, not settled physiology.",
    },
    {
      q: "Does masturbation lower testosterone?",
      a: "No. Direct endocrine measurements show testosterone doesn't meaningfully move with orgasm; the post-orgasm change is a prolactin rise and dopamine dip (the refractory period), with any small downstream testosterone drift resolving within hours. There is no cumulative drain across ejaculations, no depletion, and no evidence regular ejaculation lowers baseline testosterone.",
    },
    {
      q: "Is frequent ejaculation bad for you?",
      a: "The best large-scale data points the other way. In the Health Professionals Follow-up Study, men reporting 21 or more ejaculations per month in middle age had roughly a third lower risk of prostate cancer diagnosis than men reporting four to seven, with later analyses suggesting an even larger difference. It's observational, so association rather than proof, but nothing in the literature supports frequent ejaculation being harmful.",
    },
    {
      q: "Can semen retention help with porn addiction or focus?",
      a: "The plausible benefit is behavioral, not hormonal. Changing a compulsive pornography pattern that interferes with sleep, relationships, or partnered response can help, through recalibration of arousal, not retained hormones, and large cross-national studies find no link between pornography use as such and sexual dysfunction. The discipline and self-efficacy retention communities report are real experiences that don't require an endocrine explanation.",
    },
    {
      q: "What about nocturnal emissions during retention?",
      a: "Wet dreams are a normal physiological release and don't undo anything hormonal. They are the body's thermostat adjusting, not a failure of the retention premise, and they carry no evidence of testosterone loss or harm.",
    },
  ],
  "honey-packets": [
    {
      q: "What's actually in honey packets?",
      a: "FDA laboratory testing has confirmed hidden prescription drugs in dozens of named honey-based sexual-enhancement products, most commonly sildenafil (Viagra) and tadalafil (Cialis), sometimes both, sometimes with undeclared extras like acetaminophen. The doses are unknown and unlisted. Products not on the FDA's tested list aren't clean, just untested.",
    },
    {
      q: "Are honey packets just natural supplements?",
      a: "No. The 'natural' marketing is the cover story for what is, in lab-confirmed cases, an unmeasured dose of a real vasodilator sold outside every system that would otherwise check it. There is no prescriber, no pharmacy, no quality control, and no way to know the dose or the drug, which is precisely the problem.",
    },
    {
      q: "What are the risks of taking a honey packet?",
      a: "The documented ones are severe hypotension and syncope, cardiovascular instability (the EMS literature has a guide for this exact presentation), priapism requiring urgent hospital treatment, and dangerous interaction with nitrates. The risk is an unknown dose of a real drug with real contraindications, taken by someone who believes they took neither.",
    },
    {
      q: "I already took a honey packet. What should I watch for?",
      a: "Treat yourself as having taken an unknown dose of a PDE5 inhibitor: no nitrates, and tell any clinician what you took and when if anything goes wrong, because the interaction window runs long. An erection past the usual window is a rescue-ladder event, not a wait-it-out event, and four hours is the emergency line.",
    },
    {
      q: "Is it safer to just buy generic Viagra or Cialis instead?",
      a: "Yes, and the value math already ran the numbers. Generic sildenafil and tadalafil are cheap, legal, labeled, and prescriber-supervised, which is the entire point of the legitimate channel. The packet is the same mechanism minus every safety feature that makes it survivable, at a similar or worse price.",
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
  "trt-high-hematocrit": [
    {
      q: "What hematocrit level is too high on TRT?",
      a: "The Endocrine Society guideline says stop therapy if hematocrit exceeds 54%, evaluate for hypoxia and sleep apnea, and restart at a reduced dose once it comes down; the EAU uses the same 54% line with venesection considered. Below that, management is individual and belongs to you and your prescriber. Note that the 'keep it under 45' target floating around TRT circles is borrowed from polycythemia vera treatment, a different disease.",
    },
    {
      q: "Why does testosterone raise hematocrit?",
      a: "Two engines: testosterone increases erythropoietin (EPO) and resets the EPO/hemoglobin set point higher, and it stimulates the bone marrow directly, independent of EPO. A 2014 study also showed ferritin and hepcidin falling alongside the hemoglobin rise, which is why iron stores drain on TRT even before anyone donates blood.",
    },
    {
      q: "Do I have to donate blood if my hematocrit is high on TRT?",
      a: "At guideline level (above 54%) you need a prescriber-led plan that may include pausing therapy, venesection, and evaluating sleep apnea and other drivers. Below that it is individual. Donation and therapeutic phlebotomy are the most direct levers that exist, and the studies people cite as 'proof' donation fails actually show the opposite: TRT keeps pushing the number back up between donations, so for some men it is a maintenance rhythm rather than a one-time fix.",
    },
    {
      q: "Can blood donation centers turn me away for being on testosterone?",
      a: "Testosterone replacement does not appear on the Red Cross deferral criteria, and collection organizations state that donors on TRT may donate if they meet all general qualifications, including the hemoglobin check (minimum 13.0 g/dL for men, maximum 20.0). One nuance: blood centers collect donations, they do not perform therapy, so a donation that is medically necessary is really therapeutic phlebotomy, a clinician-ordered procedure.",
    },
    {
      q: "Will lowering my testosterone dose fix high hematocrit?",
      a: "Rarely. In a 2024 retrospective covering roughly 7,000 testosterone cypionate patients at one clinic, only 60 (well under 1%) reached a defined stable state where the polycythemia effect stopped, at total testosterone between 605 and 1051 ng/dL. The levers with more support are fixing sleep apnea and smoking, changing delivery (gel, nasal, more frequent split injections, or the subcutaneous autoinjector, which showed about 41% lower hematocrit rises than the same weekly IM dose), and phlebotomy when the number says so.",
    },
    {
      q: "Why do men on TRT who donate blood feel terrible even with normal hemoglobin?",
      a: "Usually ferritin. TRT suppresses hepcidin and drains iron stores, and every donated unit removes roughly 200-250 mg more. Community reports converge on ferritin below about 30 ng/mL as the 'feel like crap' zone, though that threshold is forum-observed, not guideline-grade. If you are donating or getting phlebotomized on TRT, ask for ferritin with every CBC, and rule out hemochromatosis before any iron loading.",
    },
    {
      q: "What is rusfertide and does it help TRT hematocrit?",
      a: "Rusfertide (Mimrylo), FDA-approved in August 2026, is a synthetic hepcidin mimetic that limits iron available for red-cell production; in the phase 3 VERIFY trial 76.9% of patients needed no phlebotomy over 32 weeks versus 32.9% on placebo. It is approved for polycythemia vera, not for testosterone-induced erythrocytosis, but it proves the hepcidin pathway is druggable and is the closest thing to a real fix on the horizon for the TRT version.",
    },
  ],
  "lying-to-your-urologist": [
    {
      q: "How common is it for patients to withhold information from their doctor?",
      a: "Very. In a 2018 JAMA Network Open survey of more than 4,500 US adults, 81% of the younger sample and 61% of the older sample said they had withheld at least one type of medically relevant information from a clinician. The most common reasons were not wanting to be judged or lectured, not wanting to hear how harmful a behavior is, and embarrassment.",
    },
    {
      q: "What percentage of men with erectile dysfunction never tell a doctor?",
      a: "Most. A six-country survey of more than 32,000 men found that only a minority of men with erectile dysfunction seek treatment, with men aged 20 to 39 least likely to. In a study of 500 men over 50 visiting a urologist for unrelated problems, 44% had some degree of erectile dysfunction they had not raised, and embarrassment was the top reason (74%).",
    },
    {
      q: "Do I have to tell my urologist about steroid use?",
      a: "You should, because it changes the diagnosis. Anabolic steroids suppress the brain's signal to the testes, and a low testosterone result without that history can be read as a different condition and treated with standard testosterone therapy, which deepens the suppression and impairs fertility. With the history, a clinician orders LH, FSH, and estradiol alongside testosterone and manages recovery instead. Surveys in 2004 and 2020 both found that about 56% of steroid users had not told a doctor.",
    },
    {
      q: "Why does my doctor need to know about poppers before prescribing sildenafil or tadalafil?",
      a: "Because poppers are nitrates, and every PDE5 inhibitor label contraindicates nitrates in any form. The combination can drop blood pressure to unsafe levels. The FDA patient information for sildenafil names amyl nitrate, amyl nitrite, and butyl nitrate (poppers) specifically. A doctor cannot warn about an interaction with a substance he was not told about.",
    },
    {
      q: "Can an incomplete history lead to a wrong diagnosis of psychogenic ED?",
      a: "Yes. A vague history plus normal labs and exam often ends in a psychogenic label. If the real pattern includes lost morning erections, failure both solo and with a partner, or recent steroid use, that label is wrong and a vascular or hormonal cause goes unexamined. If the real pattern is that function is fine solo and fails only with partners, that points toward a psychogenic picture and can save an unneeded Doppler test. The history is what sorts the two.",
    },
    {
      q: "What should I actually tell my urologist about erectile dysfunction?",
      a: "Bring a written list: everything you take (prescribed, telehealth, compounded, gray-market, supplements) with source and last dose; any anabolic steroid use, ever, with dates; alcohol as a weekly number plus any recreational drugs including poppers; the pattern (onset, how many attempts fail, morning erections, solo versus partnered); and relationship context. Say the hardest item first. A good sexual-medicine clinician treats it as data, not a confession.",
    },
  ],
  "withdrawn-erection-drugs": [
    {
      q: "Why was Uprima (sublingual apomorphine) withdrawn?",
      a: "Two reasons, in two places. In the US, the maker withdrew its application in 2000 after fainting and low-blood-pressure episodes in the trials (Public Citizen counted roughly one man in thirty at the 4 mg dose), even though an FDA advisory committee had voted 9 to 3 in its favour. In Europe it was approved in 2001 and the company let the marketing authorisation expire in 2006 for commercial reasons: efficacy was modest (about 49% of attempts versus 24% on placebo) and nausea was common, so it could not compete with the PDE5 inhibitors.",
    },
    {
      q: "Is yohimbine FDA-approved for erectile dysfunction?",
      a: "No. Yohimbine has never held an FDA approval for erectile dysfunction. Prescription yohimbine tablets were sold for decades as unapproved drugs, and in 1989 the FDA's over-the-counter aphrodisiac rule listed yohimbine by name among ingredients that cannot be considered safe and effective for OTC use. Yohimbe bark supplements are still sold, but NIH notes most do not state their yohimbine content and the compound is linked to irregular heartbeat, blood-pressure problems, heart attacks, and seizures.",
    },
    {
      q: "What is in gas-station male enhancement pills like Rhino?",
      a: "Often a real prescription drug that is not on the label. FDA laboratory testing has repeatedly found undeclared sildenafil, tadalafil, or chemical analogs such as sulfoaildenafil in products sold as herbal. The FDA's public list of tainted sexual-enhancement products runs to more than four hundred notifications, and in 2018 the agency warned consumers against all Rhino-branded products after reports of chest pain, severe headaches, and prolonged erections that ended in hospital. The hidden drug interacts dangerously with nitrates.",
    },
    {
      q: "Why did papaverine injections get replaced by alprostadil?",
      a: "Papaverine worked, but long-term follow-up showed the cost. A 1990 series of 100 men on papaverine-based injections found a fibrotic complication rate of 31% at twelve months, and priapism after a diagnostic papaverine dose ran roughly 3 to 5% in large series. Intracavernosal alprostadil produced comparable erections with lower rates of both, so it became the base of modern injection therapy. Papaverine survives as one ingredient in compounded trimix, under prescriber monitoring.",
    },
    {
      q: "What happened to Enzyte and ExtenZe?",
      a: "Enzyte's founder, Steven Warshak, was convicted by a federal jury in 2008 on 93 counts including mail fraud, bank fraud, and money laundering, tied to fabricated satisfaction surveys, fictitious doctors, and an auto-ship billing scheme; the Justice Department later returned about $24 million to victims. ExtenZe's maker, Biotab Nutraceuticals, settled with the Orange County District Attorney in 2006 and again in 2011 ($1.75 million) over unsubstantiated enlargement claims, unauthorised charges, and lots that exceeded California's lead limit. No pill has ever been shown to increase penile size.",
    },
    {
      q: "Which erectile dysfunction treatments have survived regulatory review?",
      a: "The PDE5 inhibitors (sildenafil, tadalafil, vardenafil, avanafil), alprostadil as an injection and as the MUSE urethral pellet, and penile implants. All went through controlled trials, carry labels that disclose their risks, and have decades of post-market safety data. That is the common thread: the treatments still standing are the ones that went through the evidence process rather than around it. If you are considering a product for erectile function, that channel, a clinician and a licensed pharmacy, is the difference.",
    },
  ],
  "proviron-underground": [
    {
      q: "What is Proviron (mesterolone)?",
      a: "Mesterolone is an oral androgen introduced by Schering in 1967 under the brand name Proviron. Chemically it is 1-methyl-dihydrotestosterone: it cannot convert to estrogen, has weak anabolic activity, acts like DHT at the androgen receptor, and binds sex hormone-binding globulin (SHBG) strongly. It was approved in Europe and elsewhere for male hypogonadism and as an infertility adjunct. It has never been approved in the United States.",
    },
    {
      q: "Does Proviron improve libido or erections?",
      a: "There is no clinical trial of mesterolone for erectile dysfunction or erection quality, in any population. The claims come from decades of first-person forum reports, which is Anecdote grade. The one head-to-head trial in hypogonadal men (1980) found oral testosterone significantly better than mesterolone for libido and erections. The closest controlled evidence for the DHT class, transdermal DHT gel trials, showed a transient improvement in morning erections in androgen-deficient older men and no sexual-function benefit in healthy men over two years.",
    },
    {
      q: "Is Proviron legal in the United States?",
      a: "No. Mesterolone is listed by name in the federal definition of anabolic steroids (21 U.S.C. 802(41)) and is a Schedule III controlled substance. Because it is not FDA-approved, no US prescription or compounded version exists, so any product sold as Proviron to a US buyer is gray market with unverified identity and purity.",
    },
    {
      q: "Does mesterolone raise free testosterone?",
      a: "It binds SHBG strongly, so in principle it can shift the ratio of free to total testosterone. The small uncontrolled study that measured this found total testosterone and SHBG both fell while the free fraction rose, with no change in absolute free testosterone. Whether that ratio shift changes symptoms was never tested. If you suspect high SHBG is masking low free testosterone, that is a question a blood panel and a clinician can answer directly.",
    },
    {
      q: "What are the risks of mesterolone?",
      a: "It is a DHT-derived androgen, so acne, body hair, and acceleration of male-pattern hair loss are the documented androgenic effects. Like all exogenous androgens it suppresses the body's own testosterone, LH, and FSH, which matters for fertility. Oral androgens as a class lower HDL, and DHT-axis drugs raise hematocrit. It is not hepatotoxic in its genuine form, but gray-market product may not be mesterolone at all. Prostate monitoring is standard with any androgen.",
    },
    {
      q: "Did mesterolone work for male infertility?",
      a: "No. A World Health Organization randomized, double-blind, placebo-controlled trial in 1989 (248 couples, seven centres) found pregnancy rates on mesterolone were not significantly different from placebo and semen quality did not improve. A 1991 Belgian placebo-controlled trial and a Cochrane review pooling eleven androgen trials reached the same conclusion.",
    },
  ],
  "wolverine-blend": [
    {
      q: "What is the Wolverine stack?",
      a: "Internet shorthand for combining two gray-market peptides, BPC-157 and TB-500, for injury repair. The name comes from the Marvel character who heals from anything. It originated on bodybuilding forums in the 2010s and spread through Reddit, podcasts and TikTok. Neither peptide is approved for human use anywhere.",
    },
    {
      q: "Is BPC-157 proven to heal injuries in humans?",
      a: "No. BPC-157 has a large rodent literature, mostly from one lab at the University of Zagreb that first described it in 1993, showing faster healing across many injury models in rats. Human evidence amounts to a few small pilot reports and a Phase I safety study that was registered in 2015 and cancelled without results. No controlled human trial has established efficacy or a dose.",
    },
    {
      q: "What is TB-500 and where did it come from?",
      a: "TB-500 is a synthetic seven-amino-acid fragment of the human protein thymosin beta-4, sold as a veterinary preparation. Its first documented market was horse racing; by 2012 the Hong Kong racing laboratory had published an anti-doping assay for it in equine urine and plasma. There are no human clinical trials of TB-500.",
    },
    {
      q: "Are BPC-157 and TB-500 banned in sport?",
      a: "Yes, at all times, in and out of competition. TB-500 falls under S2 (peptide hormones, growth factors and related substances) on the WADA Prohibited List, where thymosin beta-4 and its derivatives are named. BPC-157 was added in 2022 under S0, the class for substances with no current human approval anywhere. USADA has warned that no safe dose is known and that it appears undeclared in some wellness products.",
    },
    {
      q: "Is BPC-157 legal to compound or prescribe in the US?",
      a: "As of 2026, no lawful compounding channel exists. In September 2023 the FDA placed BPC-157 in Category 2 of its 503A bulk drug substances list, citing immunogenicity and impurity concerns, which stopped licensed compounding pharmacies from making it. In April 2026 the FDA removed it from Category 2 on procedural grounds and scheduled an advisory committee review; that is not approval and does not place it on the compounding list. Products sold online as BPC-157 or TB-500 are unregulated research-labeled vials.",
    },
    {
      q: "Why do men use the Wolverine stack after penile injuries or with trimix?",
      a: "Two real worries drive it: injuries from enhancement routines that men are embarrassed to show a doctor, and the long-term scarring risk of repeated intracavernosal injections. The stack promises a fix for both without a conversation. There is no human evidence it delivers one, and injuries with pain, new curvature or a sudden change in erectile function have time-sensitive clinical paths that a peptide is not on. See a urologist and describe exactly what happened.",
    },
  ],
  "pegym-decade": [
    {
      q: "Does jelqing work?",
      a: "There are no clinical trials of jelqing or other manual penile enlargement exercises, so there is no evidence of benefit. What the medical literature does document is the injury side: repetitive trauma to the penis can cause scarring and plaque with a Peyronie's-like curve, nerve and vascular injury, penile fracture, and hard flaccid syndrome. Urologists advise against it.",
    },
    {
      q: "Do penile traction devices actually add length?",
      a: "Traction is the one non-surgical method with clinical studies. Small, uncontrolled urology trials (Gontero 2009, Nikoobakht 2011) reported modest average length gains of roughly one to two centimeters after months of many hours of daily wear, with no change in girth. The same device class is used in Peyronie's disease and after prostatectomy. The effect is real but small and slow, and device use belongs in a plan with a urologist.",
    },
    {
      q: "What is hard flaccid syndrome?",
      a: "An acquired, chronic condition first described in online forums and now characterized in the urology literature: the flaccid penis stays semi-rigid and won't relax, often with pain, sensory changes, pelvic-floor tension, and reduced erectile rigidity. It typically follows a traumatic injury at the base of an erect penis. It is a reason to see a urologist, not to rest and resume an exercise routine.",
    },
    {
      q: "Is my penis size normal?",
      a: "Very likely. The Veale 2015 nomograms, built from clinician measurements of up to 15,521 men, put the average erect length at about 13 cm and average erect circumference at about 11.7 cm. In a clinic study of 67 men requesting surgical lengthening, none had a severely short penis and none had an anatomical abnormality. A urologist can measure you once, properly, and tell you where you sit on the curve.",
    },
    {
      q: "What is small penis syndrome?",
      a: "A clinical term from Wylie and Eardley (2007) for excessive worry about penis size in men whose size is normal. It ranges from ordinary concern to obsessive rumination with checking rituals and body dysmorphic disorder. Men with body dysmorphic concern about size are more likely to have tried jelqing, pumps, or stretching devices with poor results, and more likely to have erectile difficulty. The effective response is assessment and reassurance from a clinician, and psychological help when the worry does not lift.",
    },
    {
      q: "What symptoms after enhancement exercises need a doctor?",
      a: "New pain, bruising, a new bend or curve, numbness or sensory change, a hard lump or plaque, a loss of erectile rigidity, or a flaccid penis that stays firm and won't relax all warrant a urology visit. A sudden pop with pain and rapid swelling during an erection may be a penile fracture, which is a surgical emergency: go to the emergency department immediately.",
    },
  ],
};
