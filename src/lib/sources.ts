// Per-article source citations, mirrored from each article's visible "Sources"
// section. The article page stays the one source of truth; this feeds the
// MedicalWebPage `citation` JSON-LD (withReview in src/lib/jsonld.ts), and
// e2e/citations.spec.ts guards against drift. Regenerate with
// scripts/build-citations.mjs. product-forms has no sources section.

export type Citation = { url: string; title: string };

export const SOURCES: Record<string, Citation[]> = {
  "apomorphine-troches": [
    {
      "url": "https://pubmed.ncbi.nlm.nih.gov/11741126/",
      "title": "oral apomorphine SL for erectile dysfunction (efficacy and tolerability)"
    },
    {
      "url": "https://pubmed.ncbi.nlm.nih.gov/11558862/",
      "title": "dose-optimization study of sublingual apomorphine"
    },
    {
      "url": "https://www.citizen.org/article/letter-urging-rejection-of-apomorphine-uprima/",
      "title": "Public Citizen letter urging FDA rejection of Uprima"
    },
    {
      "url": "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC11136727/",
      "title": "apomorphine sublingual film in Parkinson's disease"
    },
    {
      "url": "https://www.empowerpharmacy.com/compounding-pharmacy/sildenafil-apomorphine-hcl-troche/",
      "title": "Empower Pharmacy"
    },
    {
      "url": "https://www.cfspharmacy.com/apomorphine-sildenafil-tadalafil-compounded/",
      "title": "CareFirst Specialty Pharmacy"
    },
    {
      "url": "https://www.innerbody.com/rugiet-reviews",
      "title": "Innerbody's independent testing and review of the flagship troche"
    },
    {
      "url": "https://en.wikipedia.org/wiki/Mesterolone",
      "title": "mesterolone pharmacology"
    }
  ],
  "atx-304": [
    {
      "url": "https://www.cambrianbio.com/atx-304",
      "title": "Cambrian Bio: ATX-304 program"
    },
    {
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC11981618",
      "title": "Holm et al. AMPK activator ATX-304 reduces oxidative stress and improves MASLD via metabolic switching"
    },
    {
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC6124394",
      "title": "Steneberg et al. PAN-AMPK activator O304 improves glucose homeostasis and microvascular perfusion in mice and type 2 diabetes patients"
    },
    {
      "url": "https://diabetesjournals.org/diabetes/article/75/Supplement_1/1782-P/169109/1782-P-Phase-1b-Study-of-AMPK-Mitochondrial",
      "title": "Thieroff-Ekerdt et al. Phase 1b Study of AMPK/Mitochondrial Activator ATX-304 in Prediabetic Obese Participants"
    },
    {
      "url": "https://www.cambrianbio.com/news-and-publications/cambrian-bio-presents-positive-human-translational-data-for-atx-304-the-first-ampk-network-activator-at-the-american-diabetes-associations-86th-scientific-sessions",
      "title": "Cambrian Bio: positive human translational data for ATX-304"
    }
  ],
  "bremelanotide-pde5": [
    {
      "url": "https://pubmed.ncbi.nlm.nih.gov/15833522/",
      "title": "co-administration of PT-141 & sildenafil (enhanced response)"
    },
    {
      "url": "https://pubmed.ncbi.nlm.nih.gov/14999221/",
      "title": "PT-141 in men with inadequate response to sildenafil"
    },
    {
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC7752520/",
      "title": "review of emerging ED therapies"
    },
    {
      "url": "https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=8c9607a2-5b57-4a59-b159-cf196deebdd9",
      "title": "FDA VYLEESI (bremelanotide) prescribing information"
    }
  ],
  "cavernosography": [
    {
      "url": "https://www.auanet.org/guidelines-and-quality/guidelines/erectile-dysfunction-(ed)-guideline",
      "title": "AUA Erectile Dysfunction Guideline"
    },
    {
      "url": "https://www.ncbi.nlm.nih.gov/books/NBK562253/",
      "title": "StatPearls: Erectile Dysfunction"
    },
    {
      "url": "https://www.niddk.nih.gov/health-information/urologic-diseases/erectile-dysfunction/diagnosis",
      "title": "NIDDK: Diagnosis of Erectile Dysfunction"
    },
    {
      "url": "https://journals.lww.com/cmj/fulltext/2019/02200/dynamic_infusion_cavernosometry_and.4.aspx",
      "title": "Chinese Medical Journal 2019 (DICC classification of venous ED)"
    },
    {
      "url": "https://www.nature.com/articles/3901177",
      "title": "Int J Impot Res (congruence of veno-occlusive parameters during DICC)"
    }
  ],
  "cialis-pre-workout": [
    {
      "url": "https://pubmed.ncbi.nlm.nih.gov/17586581/",
      "title": "tadalafil and anaerobic performance (BJSM RCT)"
    },
    {
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC8508218/",
      "title": "tadalafil, redox homeostasis, and muscle-damage markers (IJERPH, 2021)"
    },
    {
      "url": "https://jamanetwork.com/journals/jama/fullarticle/1663257",
      "title": "RELAX trial (JAMA, 2013)"
    },
    {
      "url": "https://pubmed.ncbi.nlm.nih.gov/14642699/",
      "title": "tadalafil-nitrate time-course study (JACC)"
    },
    {
      "url": "https://www.wada-ama.org/en/resources/scientific-research/can-sildenafil-improve-exercise-performance-moderate-altitude",
      "title": "WADA-funded altitude research"
    },
    {
      "url": "https://dailymed.nlm.nih.gov/dailymed/fda/fdaDrugXsl.cfm?setid=bcd8f8ab-81a2-4891-83db-24a0b0e25895",
      "title": "CIALIS (tadalafil) FDA label"
    }
  ],
  "death-grip": [
    {
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC4816679/",
      "title": "Jenkins & Mulhall, Delayed orgasm and anorgasmia (Fertil Steril, 2015)"
    },
    {
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC5001992/",
      "title": "Perelman, Psychosexual therapy for delayed ejaculation (Transl Androl Urol, 2016)"
    },
    {
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC4765806/",
      "title": "Nelson et al., penile vibratory stimulation trial (Urology, 2007)"
    },
    {
      "url": "https://www.nature.com/articles/s41443-023-00692-7",
      "title": "practical guide to male delayed orgasm and anorgasmia (Int J Impot Res, 2024)"
    }
  ],
  "delayed-ejaculation": [
    {
      "url": "https://www.auanet.org/guidelines-and-quality/guidelines/disorders-of-ejaculation",
      "title": "Disorders of Ejaculation: An AUA/SMSNA Guideline"
    },
    {
      "url": "https://pubmed.ncbi.nlm.nih.gov/34961344/",
      "title": "J Urol 2022, PMID 34961344"
    }
  ],
  "ed-workup": [
    {
      "url": "https://www.auanet.org/guidelines-and-quality/guidelines/erectile-dysfunction-(ed)-guideline",
      "title": "AUA Erectile Dysfunction Guideline"
    },
    {
      "url": "https://www.niddk.nih.gov/health-information/urologic-diseases/erectile-dysfunction/diagnosis",
      "title": "NIDDK: Diagnosis of Erectile Dysfunction"
    },
    {
      "url": "https://www.ncbi.nlm.nih.gov/books/NBK562253/",
      "title": "StatPearls: Erectile Dysfunction"
    }
  ],
  "enhancement": [
    {
      "url": "https://bjui-journals.onlinelibrary.wiley.com/doi/10.1111/bju.15145",
      "title": "systematic review of penile enhancement interventions (BJU Int)"
    },
    {
      "url": "https://pubmed.ncbi.nlm.nih.gov/41344863/",
      "title": "ICSM 2024 penile augmentation recommendations"
    },
    {
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC4708600/",
      "title": "the science of vacuum devices in penile rehabilitation"
    },
    {
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC2945848/",
      "title": "mineral-oil sclerosing lipogranuloma of the penis"
    },
    {
      "url": "https://www.usada.org/spirit-of-sport/bpc-157-peptide-prohibited/",
      "title": "USADA on BPC-157"
    },
    {
      "url": "https://www.wada-ama.org/en/prohibited-list",
      "title": "the WADA Prohibited List"
    },
    {
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC3104052/",
      "title": "a review of growth-hormone abuse"
    }
  ],
  "erectile-function-signal": [
    {
      "url": "https://www.mayoclinic.org/diseases-conditions/erectile-dysfunction/in-depth/erectile-dysfunction/art-20045141",
      "title": "Mayo Clinic (ED: a sign of heart disease?)"
    },
    {
      "url": "https://pubmed.ncbi.nlm.nih.gov/24011423/",
      "title": "systematic review of ED & cardiovascular disease"
    },
    {
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC9405076/",
      "title": "review of endothelial dysfunction, ED & CVD"
    },
    {
      "url": "https://pubmed.ncbi.nlm.nih.gov/16387561/",
      "title": "Montorsi et al., the artery size hypothesis (Am J Cardiol 2005)"
    },
    {
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC4442980/",
      "title": "ED and cardiovascular disease (PMC)"
    },
    {
      "url": "https://cuaj.ca/index.php/journal/article/view/2311",
      "title": "Brock, CUAJ 2014"
    },
    {
      "url": "https://diabetesjournals.org/care/article/34/7/1669/38648/Low-Testosterone-Associated-With-Obesity-and-the",
      "title": "Diabetes Care (low testosterone, metabolic syndrome & T2D)"
    }
  ],
  "generic-pde5-value": [
    {
      "url": "https://academic.oup.com/jsm/article/21/Supplement_1/qdae001.155/7600827",
      "title": "J. Sexual Medicine: savings with Cost Plus pharmacy for ED"
    },
    {
      "url": "https://www.costplusdrugs.com/",
      "title": "Mark Cuban Cost Plus Drugs"
    },
    {
      "url": "https://www.goodrx.com/healthcare-access/research/differences-in-erectile-dysfunction-medication-prices",
      "title": "GoodRx: ED medication price differences & pill-splitting"
    }
  ],
  "hard-flaccid": [
    {
      "url": "https://link.springer.com/article/10.1186/s12610-020-00105-5",
      "title": "Abdessater et al., “Hard flaccid syndrome: state of current knowledge,” Basic and Clinical Andrology 2020"
    },
    {
      "url": "https://www.mdpi.com/2227-9032/11/20/2793",
      "title": "2023 biopsychosocial case report in Healthcare (MDPI)"
    }
  ],
  "honey-packets": [
    {
      "url": "https://www.fda.gov/consumers/health-fraud-scams/tainted-honey-based-products-hidden-active-drug-ingredients",
      "title": "FDA: tainted honey-based products with hidden active drug ingredients"
    },
    {
      "url": "https://www.jems.com/patient-care/the-hidden-dangers-of-honey-packets/",
      "title": "JEMS prehospital guide to honey-packet complications"
    },
    {
      "url": "https://academic.oup.com/jsm/article/22/Supplement_4/qdaf320.193/8375191",
      "title": "Hasley et al., priapism after viral honey packets (J Sex Med, 2025)"
    },
    {
      "url": "https://recalls-rappels.canada.ca/en/alert-recall/unauthorized-sexual-enhancement-products-may-pose-serious-health-risks",
      "title": "Health Canada: unauthorized sexual-enhancement product seizures"
    },
    {
      "url": "https://www.fda.gov/drugs/medication-health-fraud-notifications/sexual-enhancement-and-energy-product-notifications",
      "title": "FDA sexual-enhancement notification database"
    }
  ],
  "how-an-erection-works": [
    {
      "url": "https://www.ncbi.nlm.nih.gov/books/NBK513278/",
      "title": "StatPearls: Physiology, Erection"
    },
    {
      "url": "https://www.auanet.org/guidelines-and-quality/guidelines/erectile-dysfunction-(ed)-guideline",
      "title": "AUA Erectile Dysfunction Guideline"
    }
  ],
  "low-desire-vs-ed": [
    {
      "url": "https://uroweb.org/guidelines/sexual-and-reproductive-health/chapter/low-sexual-desire-and-male-hypoactive-sexual-desire-disorder",
      "title": "EAU Guidelines on Sexual and Reproductive Health: Low Sexual Desire and Male Hypoactive Sexual Desire Disorder"
    },
    {
      "url": "https://www.auanet.org/guidelines-and-quality/guidelines/erectile-dysfunction-(ed)-guideline",
      "title": "AUA Erectile Dysfunction Guideline"
    },
    {
      "url": "https://www.issm.info/media/attachments/2021/08/17/03-clinical-guidelines---issm-quick-reference-guide-on-td---vsept2015.pdf",
      "title": "ISSM Quick Reference Guide on Testosterone Deficiency"
    }
  ],
  "lying-to-your-urologist": [
    {
      "url": "https://pubmed.ncbi.nlm.nih.gov/30646397/",
      "title": "Levy et al., prevalence of and factors associated with patient nondisclosure to clinicians (JAMA Network Open, 2018)"
    },
    {
      "url": "https://pubmed.ncbi.nlm.nih.gov/11529698/",
      "title": "Eisenberg et al., perceptions about complementary therapies and reasons for nondisclosure (Annals of Internal Medicine, 2001)"
    },
    {
      "url": "https://pubmed.ncbi.nlm.nih.gov/12789385/",
      "title": "Baldwin et al., under-reporting of erectile dysfunction among men with unrelated urologic conditions (2003)"
    },
    {
      "url": "https://pubmed.ncbi.nlm.nih.gov/15541128/",
      "title": "Shabsigh et al., drivers and barriers to seeking treatment for erectile dysfunction in six countries (BJU International, 2004)"
    },
    {
      "url": "https://pubmed.ncbi.nlm.nih.gov/15317640/",
      "title": "Pope et al., anabolic steroid users' attitudes towards physicians (Addiction, 2004)"
    },
    {
      "url": "https://pubmed.ncbi.nlm.nih.gov/33307930/",
      "title": "Bonnecaze et al., characteristics and attitudes of 2,385 men using anabolic androgenic steroids (2020)"
    },
    {
      "url": "https://pubmed.ncbi.nlm.nih.gov/24636400/",
      "title": "Rahnema et al., anabolic steroid-induced hypogonadism: diagnosis and treatment (Fertility and Sterility, 2014)"
    },
    {
      "url": "https://www.auanet.org/guidelines-and-quality/guidelines/erectile-dysfunction-(ed)-guideline",
      "title": "AUA Erectile Dysfunction Guideline (2018)"
    },
    {
      "url": "https://www.accessdata.fda.gov/drugsatfda_docs/label/2017/020895s048lbl.pdf",
      "title": "FDA prescribing information for sildenafil (Viagra), nitrate contraindication and patient information naming poppers"
    },
    {
      "url": "https://www.fda.gov/drugs/medication-health-fraud-notifications/sexual-enhancement-and-energy-product-notifications",
      "title": "FDA public notifications on sexual enhancement products with hidden drug ingredients"
    },
    {
      "url": "https://www.medlineplus.gov/druginfo/meds/a699015.html",
      "title": "MedlinePlus sildenafil information"
    }
  ],
  "morning-erections": [
    {
      "url": "https://www.ncbi.nlm.nih.gov/books/NBK513278/",
      "title": "StatPearls: Physiology, Erection"
    },
    {
      "url": "https://www.auanet.org/guidelines-and-quality/guidelines/erectile-dysfunction-(ed)-guideline",
      "title": "AUA Erectile Dysfunction Guideline"
    }
  ],
  "nocturnal-tumescence-testing": [
    {
      "url": "https://www.auanet.org/guidelines-and-quality/guidelines/erectile-dysfunction-(ed)-guideline",
      "title": "AUA Erectile Dysfunction Guideline"
    },
    {
      "url": "https://www.ncbi.nlm.nih.gov/books/NBK562253/",
      "title": "StatPearls: Erectile Dysfunction"
    },
    {
      "url": "https://www.niddk.nih.gov/health-information/urologic-diseases/erectile-dysfunction/diagnosis",
      "title": "NIDDK: Diagnosis of Erectile Dysfunction"
    }
  ],
  "pde5-lineup": [
    {
      "url": "https://www.auanet.org/guidelines-and-quality/guidelines/erectile-dysfunction-(ed)-guideline",
      "title": "AUA Erectile Dysfunction Guideline"
    },
    {
      "url": "https://www.ncbi.nlm.nih.gov/books/NBK549843/",
      "title": "StatPearls: PDE5 Inhibitors"
    },
    {
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC4542406/",
      "title": "comparative review of the available PDE5 inhibitors"
    },
    {
      "url": "https://www.accessdata.fda.gov/drugsatfda_docs/label/2014/20895s039s042lbl.pdf",
      "title": "Viagra"
    },
    {
      "url": "https://www.accessdata.fda.gov/drugsatfda_docs/label/2008/021400s011lbl.pdf",
      "title": "Levitra"
    },
    {
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC3776492/",
      "title": "PMC review of PDE5 inhibitors in ED"
    }
  ],
  "pde5-long-term": [
    {
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC1397768/",
      "title": "Treating ED when PDE5 inhibitors fail"
    },
    {
      "url": "https://pubmed.ncbi.nlm.nih.gov/17324145/",
      "title": "MR NOED study (nebivolol vs metoprolol)"
    },
    {
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC10878497/",
      "title": "tadalafil & cardiovascular events/mortality"
    },
    {
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC11323371/",
      "title": "meta-analysis of PDE5i cardiovascular outcomes"
    },
    {
      "url": "https://pubmed.ncbi.nlm.nih.gov/21848583/",
      "title": "telmisartan & insulin sensitivity (systematic review)"
    },
    {
      "url": "https://www.ncbi.nlm.nih.gov/books/NBK558978/",
      "title": "StatPearls: sildenafil pharmacology & interactions"
    }
  ],
  "pegym-decade": [
    {
      "url": "https://pubmed.ncbi.nlm.nih.gov/18990153/",
      "title": "Gontero et al., pilot phase-II study of a penile-extender device for 'short penis' (BJU Int, 2009)"
    },
    {
      "url": "https://pubmed.ncbi.nlm.nih.gov/20102448/",
      "title": "Nikoobakht et al., penile-extender device in men with shortened penis (J Sex Med, 2011)"
    },
    {
      "url": "https://pubmed.ncbi.nlm.nih.gov/19138361/",
      "title": "Gontero et al., penile extender in Peyronie's curvature (J Sex Med, 2009)"
    },
    {
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC3547530/",
      "title": "Chung & Brock, penile traction therapy and Peyronie's disease review (Ther Adv Urol, 2013)"
    },
    {
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC12076428/",
      "title": "Penile enhancement: a comprehensive and current perspective (Curr Urol, 2025)"
    },
    {
      "url": "https://www.ncbi.nlm.nih.gov/books/NBK551618/",
      "title": "StatPearls, Penile Fracture"
    },
    {
      "url": "https://pubmed.ncbi.nlm.nih.gov/32518654/",
      "title": "Abdessater et al., hard flaccid syndrome: state of current knowledge (Basic Clin Androl, 2020)"
    },
    {
      "url": "https://pubmed.ncbi.nlm.nih.gov/25487360/",
      "title": "Veale et al., \"Am I normal?\" nomograms for penile length and circumference (BJU Int, 2015)"
    },
    {
      "url": "https://pubmed.ncbi.nlm.nih.gov/12152118/",
      "title": "Mondaini et al., penile length is normal in most men seeking lengthening procedures (Int J Impot Res, 2002)"
    },
    {
      "url": "https://pubmed.ncbi.nlm.nih.gov/17355371/",
      "title": "Wylie & Eardley, penile size and the 'small penis syndrome' (BJU Int, 2007)"
    },
    {
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC4599552/",
      "title": "Veale et al., sexual functioning in men with body dysmorphic disorder concerning penis size (Sex Med, 2015)"
    },
    {
      "url": "https://theconversation.com/jelqing-the-latest-in-a-long-history-of-attempts-to-enlarge-the-male-member-222634",
      "title": "Taylor, jelqing and the long history of enlargement attempts (The Conversation, 2024)"
    },
    {
      "url": "https://en.wikipedia.org/wiki/Penis_enlargement",
      "title": "Wikipedia, penis enlargement"
    }
  ],
  "pelvic-floor-and-erections": [
    {
      "url": "https://pubmed.ncbi.nlm.nih.gov/15527607/",
      "title": "Dorey G, et al. Randomised controlled trial of pelvic floor muscle exercises and manometric biofeedback for erectile dysfunction, Br J Gen Pract 2004;54(508):819–825"
    },
    {
      "url": "https://pubmed.ncbi.nlm.nih.gov/16104916/",
      "title": "Dorey G, et al. Pelvic floor exercises for erectile dysfunction, BJU Int 2005"
    },
    {
      "url": "https://www.ncbi.nlm.nih.gov/books/NBK513278/",
      "title": "StatPearls: Physiology, Erection"
    }
  ],
  "penile-doppler-ultrasound": [
    {
      "url": "https://www.auanet.org/guidelines-and-quality/guidelines/erectile-dysfunction-(ed)-guideline",
      "title": "AUA Erectile Dysfunction Guideline"
    },
    {
      "url": "https://www.ncbi.nlm.nih.gov/books/NBK537320/",
      "title": "StatPearls: Penile Doppler Ultrasound / Duplex Ultrasonography"
    },
    {
      "url": "https://www.niddk.nih.gov/health-information/urologic-diseases/erectile-dysfunction/diagnosis",
      "title": "NIDDK: Diagnosis of Erectile Dysfunction"
    },
    {
      "url": "https://www.ajronline.org/doi/10.2214/AJR.19.22141",
      "title": "AJR 2020: Penile Doppler Ultrasound for ED, technique and interpretation"
    },
    {
      "url": "https://pubmed.ncbi.nlm.nih.gov/33960127/",
      "title": "Andrology 2021: the penile duplex ultrasound, how and when"
    }
  ],
  "penile-injections": [
    {
      "url": "https://www.ncbi.nlm.nih.gov/books/NBK542217/",
      "title": "StatPearls: Alprostadil"
    },
    {
      "url": "https://pubmed.ncbi.nlm.nih.gov/37078428/",
      "title": "current status of intracavernosal injection therapy in ED"
    },
    {
      "url": "https://dailymed.nlm.nih.gov/dailymed/fda/fdaDrugXsl.cfm?setid=a295fc1e-d82c-4f44-bc2d-a552bf594c98",
      "title": "CAVERJECT (alprostadil) FDA label"
    },
    {
      "url": "https://www.defymedical.com/blog/trimix-patient-info-sheet/",
      "title": "Defy Medical (Trimix patient info)"
    },
    {
      "url": "https://www.olympiapharmacy.com/blog/trimix-injection-dosage-chart-explained/",
      "title": "Olympia Pharmacy"
    },
    {
      "url": "https://www.auanet.org/guidelines-and-quality/guidelines/diagnosis-and-management-of-priapism-aua/smsna-guideline-(2022)",
      "title": "AUA/SMSNA Priapism Guideline (2022)"
    }
  ],
  "peyronies-disease": [
    {
      "url": "https://www.auanet.org/guidelines-and-quality/guidelines/peyronies-disease-guideline",
      "title": "AUA Peyronie's Disease Guideline"
    },
    {
      "url": "https://www.niddk.nih.gov/health-information/urologic-diseases/penile-curvature-peyronies-disease",
      "title": "NIDDK: Penile Curvature (Peyronie's Disease)"
    },
    {
      "url": "https://www.ncbi.nlm.nih.gov/books/NBK560628/",
      "title": "StatPearls: Peyronie Disease"
    }
  ],
  "post-prostatectomy-rehabilitation": [
    {
      "url": "https://www.auanet.org/guidelines-and-quality/guidelines/erectile-dysfunction-(ed)-guideline",
      "title": "AUA/SMSNA Erectile Dysfunction Guideline"
    },
    {
      "url": "https://pubmed.ncbi.nlm.nih.gov/9302132/",
      "title": "Montorsi et al., early alprostadil after prostatectomy, J Urol 1997"
    },
    {
      "url": "https://pubmed.ncbi.nlm.nih.gov/18650827/",
      "title": "Padma-Nathan et al., nightly sildenafil, Int J Impot Res 2008"
    },
    {
      "url": "https://pubmed.ncbi.nlm.nih.gov/18640769/",
      "title": "Montorsi et al., REINVENT, Eur Urol 2008"
    },
    {
      "url": "https://pubmed.ncbi.nlm.nih.gov/24169081/",
      "title": "Montorsi et al., REACTT, Eur Urol 2014"
    },
    {
      "url": "https://pubmed.ncbi.nlm.nih.gov/17822466/",
      "title": "Köhler et al., early vacuum device, BJU Int 2007"
    },
    {
      "url": "https://pubmed.ncbi.nlm.nih.gov/22573231/",
      "title": "Prota et al., early pelvic floor biofeedback, Int J Impot Res 2012"
    },
    {
      "url": "https://pubmed.ncbi.nlm.nih.gov/26538105/",
      "title": "Geraerts et al., pelvic floor training for ED and climacturia, Int J Impot Res 2016"
    },
    {
      "url": "https://pubmed.ncbi.nlm.nih.gov/16104916/",
      "title": "Dorey et al., pelvic floor exercises for ED, BJU Int 2005"
    },
    {
      "url": "https://pubmed.ncbi.nlm.nih.gov/40147459/",
      "title": "Dinneen et al., NeuroSAFE PROOF, Lancet Oncol 2025"
    },
    {
      "url": "https://pubmed.ncbi.nlm.nih.gov/27077129/",
      "title": "Haahr et al., adipose-derived regenerative cells, EBioMedicine 2016"
    },
    {
      "url": "https://pubmed.ncbi.nlm.nih.gov/32007430/",
      "title": "Baccaglini et al., shockwave after prostatectomy, J Sex Med 2020"
    }
  ],
  "premature-ejaculation": [
    {
      "url": "https://www.auanet.org/guidelines-and-quality/guidelines/disorders-of-ejaculation",
      "title": "AUA/SMSNA Disorders of Ejaculation Guideline"
    },
    {
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC4184677/",
      "title": "ISSM Guidelines for the Diagnosis & Treatment of PE"
    },
    {
      "url": "https://www.ncbi.nlm.nih.gov/books/NBK546701/",
      "title": "StatPearls: Premature Ejaculation"
    }
  ],
  "priapism-clock": [
    {
      "url": "https://www.auanet.org/guidelines-and-quality/guidelines/diagnosis-and-management-of-priapism-aua/smsna-guideline-(2022)",
      "title": "AUA/SMSNA Priapism Guideline (2022)"
    },
    {
      "url": "https://dailymed.nlm.nih.gov/dailymed/fda/fdaDrugXsl.cfm?setid=a295fc1e-d82c-4f44-bc2d-a552bf594c98",
      "title": "CAVERJECT (alprostadil) FDA label"
    },
    {
      "url": "https://www.ncbi.nlm.nih.gov/books/NBK542217/",
      "title": "StatPearls: Alprostadil"
    }
  ],
  "proviron-underground": [
    {
      "url": "https://en.wikipedia.org/wiki/Mesterolone",
      "title": "mesterolone history, approvals, and pharmacology"
    },
    {
      "url": "https://pubmed.ncbi.nlm.nih.gov/7000879/",
      "title": "Luisi & Franchi 1980, double-blind testosterone undecanoate vs mesterolone in hypogonadal men"
    },
    {
      "url": "https://pubmed.ncbi.nlm.nih.gov/25842579/",
      "title": "Dugeroglu et al. 2014, uncontrolled mesterolone series in aging-male syndrome"
    },
    {
      "url": "https://pubmed.ncbi.nlm.nih.gov/2680994/",
      "title": "WHO Task Force 1989, mesterolone and idiopathic male infertility (double-blind RCT)"
    },
    {
      "url": "https://pubmed.ncbi.nlm.nih.gov/1900485/",
      "title": "Gerris et al. 1991, placebo-controlled trial of high-dose mesterolone in male infertility"
    },
    {
      "url": "https://pubmed.ncbi.nlm.nih.gov/10796496/",
      "title": "Cochrane review, androgens vs placebo for idiopathic oligo/asthenospermia"
    },
    {
      "url": "https://pubmed.ncbi.nlm.nih.gov/11932266/",
      "title": "Kunelius et al. 2002, transdermal DHT in the aging male (randomized, double-blind)"
    },
    {
      "url": "https://pubmed.ncbi.nlm.nih.gov/24751323/",
      "title": "Sartorius, Ly & Handelsman 2014, 24-month placebo-controlled DHT trial in healthy older men"
    },
    {
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC6459338/",
      "title": "Swerdloff et al. 2017, Endocrine Reviews: DHT biochemistry, physiology, and clinical implications"
    },
    {
      "url": "https://uscode.house.gov/view.xhtml?req=granuleid%3AUSC-prelim-title21-section802&num=0&edition=prelim",
      "title": "21 U.S.C. 802(41), the federal anabolic steroid definition listing mesterolone"
    }
  ],
  "psychogenic-ed": [
    {
      "url": "https://www.auanet.org/guidelines-and-quality/guidelines/erectile-dysfunction-(ed)-guideline",
      "title": "AUA Erectile Dysfunction Guideline"
    },
    {
      "url": "https://www.ncbi.nlm.nih.gov/books/NBK562253/",
      "title": "StatPearls: Erectile Dysfunction"
    }
  ],
  "read-your-labs": [
    {
      "url": "https://www.auanet.org/guidelines-and-quality/guidelines/testosterone-deficiency-guideline",
      "title": "AUA Testosterone Deficiency Guideline"
    },
    {
      "url": "https://www.ncbi.nlm.nih.gov/books/NBK532933/",
      "title": "StatPearls: Male Hypogonadism"
    },
    {
      "url": "https://www.ncbi.nlm.nih.gov/books/NBK278954/",
      "title": "Endotext: Assessing Insulin Sensitivity (HOMA-IR)"
    },
    {
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC8280753/",
      "title": "C-reactive protein in risk stratification"
    }
  ],
  "retatrutide": [
    {
      "url": "https://www.lilly.com/news/stories/what-to-know-about-retatrutide",
      "title": "Eli Lilly: What to know about retatrutide"
    },
    {
      "url": "https://www.ajmc.com/view/retatrutide-achieves-up-to-30-3-average-weight-loss-in-phase-3-triumph-1-trial",
      "title": "AJMC: Retatrutide achieves up to 30.3% average weight loss in Phase 3 TRIUMPH-1 trial"
    },
    {
      "url": "https://www.medscape.com/viewarticle/retatrutide-data-show-dramatic-weight-loss-other-benefits-2026a1000iz0",
      "title": "Medscape: Retatrutide data show dramatic weight loss, other benefits"
    },
    {
      "url": "https://en.wikipedia.org/wiki/Retatrutide",
      "title": "Retatrutide (overview)"
    },
    {
      "url": "https://www.sec.gov/Archives/edgar/data/0000059478/000005947826000077/q226lillysalesandearningsp.htm",
      "title": "Eli Lilly and Company: Q2 2026 earnings release (Form 8-K)"
    }
  ],
  "semen-retention": [
    {
      "url": "https://pubmed.ncbi.nlm.nih.gov/12659241/",
      "title": "Jiang et al. 2003, the day-seven testosterone peak study (retracted December 2021, duplicate publication)"
    },
    {
      "url": "https://pubmed.ncbi.nlm.nih.gov/11760788/",
      "title": "Exton et al., endocrine response to orgasm with and without abstinence (World J Urol, 2001)"
    },
    {
      "url": "https://pubmed.ncbi.nlm.nih.gov/27033442/",
      "title": "Rider et al., ejaculation frequency and prostate cancer risk (Eur Urol, 2016)"
    },
    {
      "url": "https://pubmed.ncbi.nlm.nih.gov/25816904/",
      "title": "Landripet & Štulhofer, pornography use and sexual difficulties (J Sex Med, 2015)"
    }
  ],
  "shockwave-therapy": [
    {
      "url": "https://www.auanet.org/guidelines-and-quality/guidelines/erectile-dysfunction-(ed)-guideline",
      "title": "AUA/SMSNA Erectile Dysfunction Guideline"
    },
    {
      "url": "https://pubmed.ncbi.nlm.nih.gov/34000480/",
      "title": "SMSNA position statement on restorative therapies, Sex Med 2021"
    },
    {
      "url": "https://pubmed.ncbi.nlm.nih.gov/22425129/",
      "title": "Vardi et al., sham-controlled trial, J Urol 2012"
    },
    {
      "url": "https://pubmed.ncbi.nlm.nih.gov/26694904/",
      "title": "Kitrey et al., PDE5 non-responders, J Urol 2016"
    },
    {
      "url": "https://pubmed.ncbi.nlm.nih.gov/29477719/",
      "title": "Kitrey et al., two-year durability, J Urol 2018"
    },
    {
      "url": "https://pubmed.ncbi.nlm.nih.gov/32696128/",
      "title": "Vinay et al., PDE5-refractory sham-controlled trial, World J Urol 2021"
    },
    {
      "url": "https://pubmed.ncbi.nlm.nih.gov/27321373/",
      "title": "Lu et al., systematic review and meta-analysis, Eur Urol 2017"
    },
    {
      "url": "https://pubmed.ncbi.nlm.nih.gov/30664671/",
      "title": "Sokolakis & Hatzichristodoulou, meta-analysis of sham-controlled trials, Int J Impot Res 2019"
    },
    {
      "url": "https://pubmed.ncbi.nlm.nih.gov/32007430/",
      "title": "Baccaglini et al., shockwave after prostatectomy, J Sex Med 2020"
    },
    {
      "url": "https://pubmed.ncbi.nlm.nih.gov/19473751/",
      "title": "Palmieri et al., shockwave in Peyronie's disease, Eur Urol 2009"
    }
  ],
  "sleep-and-erections": [
    {
      "url": "https://pubmed.ncbi.nlm.nih.gov/21632481/",
      "title": "Leproult R, Van Cauter E. Effect of 1 week of sleep restriction on testosterone levels in young healthy men, JAMA 2011;305(21):2173–2174"
    },
    {
      "url": "https://www.cochranelibrary.com/cdsr/doi/10.1002/14651858.CD013169.pub2/full",
      "title": "Cochrane review: positive airway pressure therapy for erectile dysfunction in men with obstructive sleep apnoea"
    }
  ],
  "stuck-cock-ring": [
    {
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC6362780/",
      "title": "Sarkar et al., penile strangulation and removal by aspiration and string method (Urol Ann, 2019)"
    },
    {
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC3784970/",
      "title": "vacuum erection device review, 30-minute constriction-ring ischemia (Sex Med Rev)"
    },
    {
      "url": "https://academic.oup.com/smr/article/13/2/172/8016502",
      "title": "Wang, vacuum erectile devices (Sex Med Rev, 2025)"
    },
    {
      "url": "https://medlineplus.gov/ency/patientinstructions/000985.htm",
      "title": "MedlinePlus: vacuum erectile devices"
    }
  ],
  "telemedicine-visit": [
    {
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC8604198/",
      "title": "Testosterone replacement therapy in the era of telemedicine"
    },
    {
      "url": "https://pubmed.ncbi.nlm.nih.gov/32945730/",
      "title": "Evaluation of online telehealth platforms for ED"
    },
    {
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC10397420/",
      "title": "Characteristics of direct-to-consumer ED platforms"
    }
  ],
  "testosterone-test-cost": [
    {
      "url": "https://doi.org/10.1210/jc.2018-00229",
      "title": "Endocrine Society Clinical Practice Guideline, J Clin Endocrinol Metab. 2018;103(5):1715–1744"
    }
  ],
  "testosterone-therapy": [
    {
      "url": "https://www.auanet.org/guidelines-and-quality/guidelines/testosterone-deficiency-guideline",
      "title": "AUA Testosterone Deficiency Guideline"
    },
    {
      "url": "https://www.ncbi.nlm.nih.gov/books/NBK534853/",
      "title": "StatPearls: Androgen Replacement"
    },
    {
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC4111565/",
      "title": "cardiac & metabolic effects of anabolic-steroid abuse"
    },
    {
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC8987149/",
      "title": "reproductive consequences of anabolic-steroid use"
    }
  ],
  "training-for-erections": [
    {
      "url": "https://pubmed.ncbi.nlm.nih.gov/37814532/",
      "title": "aerobic exercise & erectile function (meta-analysis of RCTs)"
    },
    {
      "url": "https://pubmed.ncbi.nlm.nih.gov/27707739/",
      "title": "physical activity & ED (systematic review & meta-analysis)"
    },
    {
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC11502486/",
      "title": "HIIT vs. moderate-intensity training on vascular function"
    }
  ],
  "trt-fertility": [
    {
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC9243576/",
      "title": "managing spermatogenesis suppression from TRT/AAS"
    },
    {
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC10890669/",
      "title": "managing male fertility in hypogonadal men on TRT"
    },
    {
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC12513088/",
      "title": "strategies for reversing testosterone-induced infertility"
    }
  ],
  "trt-high-hematocrit": [
    {
      "url": "https://academic.oup.com/jcem/article/103/5/1715/4939465",
      "title": "Bhasin et al., Endocrine Society Clinical Practice Guideline on Testosterone Therapy (JCEM, 2018), hematocrit monitoring and the >54% stop rule"
    },
    {
      "url": "https://d56bochluxqnz.cloudfront.net/media/EAU-Guidelines-on-Male-Hypogonadism-2019v2.pdf",
      "title": "EAU Guidelines on Male Hypogonadism (2019), venesection at >54%"
    },
    {
      "url": "https://pubmed.ncbi.nlm.nih.gov/24158761/",
      "title": "Bachman et al., testosterone induces erythrocytosis via increased EPO and suppressed hepcidin (Am J Physiol Endocrinol Metab, 2014)"
    },
    {
      "url": "https://pubmed.ncbi.nlm.nih.gov/33372284/",
      "title": "Ganz, erythroferrone, hepcidin, and iron homeostasis (J Cell Physiol, 2021)"
    },
    {
      "url": "https://pubmed.ncbi.nlm.nih.gov/28150363/",
      "title": "Delage et al., blood donation and testosterone replacement therapy (Transfusion, 2017)"
    },
    {
      "url": "https://www.jomh.org/articles/10.22514/jomh.2024.010",
      "title": "Kelleher, controlling the polycythemia effect associated with TRT (J Men's Health, 2024)"
    },
    {
      "url": "https://pubmed.ncbi.nlm.nih.gov/11682015/",
      "title": "normal hematological values at 4,000 m in Bolivia (High Alt Med Biol, 2001)"
    },
    {
      "url": "https://pubmed.ncbi.nlm.nih.gov/34694927/",
      "title": "subcutaneous testosterone enanthate autoinjector vs IM cypionate outcomes (J Urol, 2021)"
    },
    {
      "url": "https://www.fda.gov/news-events/press-announcements/fda-approves-first-drug-its-kind-polycythemia-vera-rare-blood-disorder",
      "title": "FDA approval of Mimrylo (rusfertide) for polycythemia vera, VERIFY trial data (August 28, 2026)"
    },
    {
      "url": "https://www.redcrossblood.org/donate-blood/how-to-donate/eligibility-requirements/eligibility-criteria-alphabetical.html",
      "title": "American Red Cross donor eligibility criteria and donation intervals"
    },
    {
      "url": "https://vorck.com/erythrocytosis.html",
      "title": "the Vorck erythrocytosis and ferritin page, as the community-document this debate runs on"
    },
    {
      "url": "http://www.sportdw.com/2013/01/lance-armstrong-blood-passport-analysis.html",
      "title": "analyses of Armstrong's biological passport values"
    }
  ],
  "urologist-visit": [
    {
      "url": "https://www.auanet.org/guidelines-and-quality/guidelines/erectile-dysfunction-(ed)-guideline",
      "title": "AUA Erectile Dysfunction Guideline"
    },
    {
      "url": "https://www.niddk.nih.gov/health-information/urologic-diseases/erectile-dysfunction/diagnosis",
      "title": "NIDDK: Diagnosis of Erectile Dysfunction"
    },
    {
      "url": "https://www.ahrq.gov/questions/index.html",
      "title": "AHRQ: Questions To Ask Your Doctor"
    }
  ],
  "venous-leak": [
    {
      "url": "https://www.auanet.org/guidelines-and-quality/guidelines/erectile-dysfunction-(ed)-guideline",
      "title": "AUA Erectile Dysfunction Guideline"
    },
    {
      "url": "https://www.ncbi.nlm.nih.gov/books/NBK513278/",
      "title": "StatPearls: Physiology, Erection"
    },
    {
      "url": "https://pubmed.ncbi.nlm.nih.gov/8808863/",
      "title": "Nehra A, et al. Mechanisms of venous leakage: a prospective clinicopathological correlation of corporeal function and structure, J Urol 1996"
    },
    {
      "url": "https://doaj.org/article/477c74fc8c5641a7821883fc0fc7f925",
      "title": "Erectile Dysfunction and Caverno-venous Leak Disease, J Men's Health 2019"
    }
  ],
  "what-it-costs": [
    {
      "url": "https://www.defymedical.com/blog/how-much-does-trimix-cost/",
      "title": "Defy Medical (trimix cost)"
    },
    {
      "url": "https://www.questhealth.com/product/mens-hormone-test-panel-basic/13073M.html",
      "title": "Quest Diagnostics (men's hormone panels)"
    },
    {
      "url": "https://vidavitalmedical.com/mens-health-clinic-costs/",
      "title": "VidaVital MD (clinic cost guide)"
    }
  ],
  "withdrawn-erection-drugs": [
    {
      "url": "https://www.accessdata.fda.gov/drugsatfda_docs/label/2024/020700s032lbl.pdf",
      "title": "MUSE (alprostadil) prescribing information, FDA"
    },
    {
      "url": "https://pubmed.ncbi.nlm.nih.gov/12090731/",
      "title": "Topiglan development review (Curr Opin Investig Drugs, 2002)"
    },
    {
      "url": "https://www.yahoo.com/news/fda-declines-approve-apricus-erectile-dysfunction-cream-121441866--finance.html",
      "title": "FDA declines to approve Vitaros, February 2018 (Reuters via Yahoo)"
    },
    {
      "url": "https://www.medicines.org.uk/emc/product/13937/smpc",
      "title": "Vitaros UK summary of product characteristics"
    },
    {
      "url": "https://pubmed.ncbi.nlm.nih.gov/11741126/",
      "title": "apomorphine SL efficacy and tolerability (Urol Int, 2001)"
    },
    {
      "url": "https://www.citizen.org/article/letter-urging-rejection-of-apomorphine-uprima/",
      "title": "Public Citizen letter on Uprima, June 2000"
    },
    {
      "url": "https://www.ema.europa.eu/en/documents/public-statement/public-statement-uprima-non-renewal-marketing-authorisation-european-union_en.pdf",
      "title": "EMA public statement on non-renewal of Uprima, 2006"
    },
    {
      "url": "https://www.sec.gov/Archives/edgar/data/0000737207/000095012404000790/v97246exv99w1.txt",
      "title": "Nastech intranasal apomorphine Phase II results (SEC 8-K, 2004)"
    },
    {
      "url": "https://pubmed.ncbi.nlm.nih.gov/15154111/",
      "title": "intranasal apomorphine, Nastech (IDrugs, 2004)"
    },
    {
      "url": "https://pubmed.ncbi.nlm.nih.gov/2342174/",
      "title": "papaverine injection therapy: results and complications (J Urol, 1990)"
    },
    {
      "url": "https://pubmed.ncbi.nlm.nih.gov/20078509/",
      "title": "incidence of papaverine-induced priapism (Andrologia, 2010)"
    },
    {
      "url": "https://pubmed.ncbi.nlm.nih.gov/1867493/",
      "title": "prolonged erections after diagnostic papaverine (Arch Esp Urol, 1991)"
    },
    {
      "url": "https://pubmed.ncbi.nlm.nih.gov/8785470/",
      "title": "intracavernous alprostadil review (Drugs Aging, 1996)"
    },
    {
      "url": "https://pubmed.ncbi.nlm.nih.gov/12879109/",
      "title": "oral phentolamine, Vasomax (Drugs Today, 2000)"
    },
    {
      "url": "https://www.thepharmaletter.com/zonagen-crashes-as-fda-terminates-phentolamine-studies",
      "title": "FDA clinical hold on Zonagen phentolamine trials, August 1999"
    },
    {
      "url": "https://www.pharmaceuticalonline.com/doc/zonagen-announces-schering-plough-to-manufact-0001",
      "title": "Zonagen and Schering-Plough Vasomax agreement, 1999"
    },
    {
      "url": "https://pubmed.ncbi.nlm.nih.gov/10845767/",
      "title": "yohimbine in erectile dysfunction: the facts (Int J Impot Res, 2000)"
    },
    {
      "url": "https://www.law.cornell.edu/cfr/text/21/310.528",
      "title": "21 CFR 310.528, OTC aphrodisiac drug products"
    },
    {
      "url": "https://www.nccih.nih.gov/health/yohimbe",
      "title": "NCCIH: yohimbe, usefulness and safety"
    },
    {
      "url": "https://ocdistrictattorney.gov/press/dietary-supplement-maker-to-pay-1-75-million-for-unfair-business-practices-including-falsely-promising-male-penile-enlargement/",
      "title": "Orange County District Attorney: ExtenZe settlement, 2011"
    },
    {
      "url": "https://www.justice.gov/archive/usao/ohs/news/05-08-12.html",
      "title": "US Attorney, Southern District of Ohio: Warshak forfeited funds returned to victims"
    },
    {
      "url": "https://en.wikipedia.org/wiki/United_States_v._Warshak",
      "title": "United States v. Warshak"
    },
    {
      "url": "https://en.wikipedia.org/wiki/Enzyte",
      "title": "Enzyte"
    },
    {
      "url": "https://www.fda.gov/drugs/medication-health-fraud-notifications/sexual-enhancement-and-energy-product-notifications",
      "title": "FDA tainted sexual enhancement and energy product notifications"
    },
    {
      "url": "https://www.fda.gov/drugs/medication-health-fraud/public-notification-control-all-natural-sexual-enhancement-contains-hidden-drug-ingredient",
      "title": "FDA notification: sulfoaildenafil and dimethylsildenafil in a \"natural\" product"
    },
    {
      "url": "https://www.fda.gov/drugs/medication-health-fraud/public-notification-gold-rhino-25000-contains-hidden-drug-ingredient",
      "title": "FDA notification: Gold Rhino 25000"
    },
    {
      "url": "https://www.cbsnews.com/news/fda-warns-consumers-against-using-rhino-male-enhancement-products/",
      "title": "FDA warning on Rhino products, November 2018 (CBS News)"
    }
  ],
  "wolverine-blend": [
    {
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC11053547/",
      "title": "Sikiric et al., stable gastric pentadecapeptide BPC 157 pleiotropic activity (Pharmaceuticals, 2024)"
    },
    {
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC11859134/",
      "title": "Józwiak et al., BPC 157 literature and patent review (Pharmaceuticals, 2025)"
    },
    {
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC12446177/",
      "title": "McGuire et al., narrative review of BPC-157 for musculoskeletal healing (2025)"
    },
    {
      "url": "https://pubmed.ncbi.nlm.nih.gov/23084823/",
      "title": "Ho et al., doping control analysis of TB-500 in equine urine and plasma (J Chromatogr A, 2012)"
    },
    {
      "url": "https://www.wada-ama.org/en/prohibited-list",
      "title": "the WADA Prohibited List (S0 and S2)"
    },
    {
      "url": "https://www.usada.org/spirit-of-sport/bpc-157-peptide-prohibited/",
      "title": "USADA, BPC-157: experimental peptide creates risk for athletes"
    },
    {
      "url": "https://www.usada.org/athlete-advisory/key-changes-2022-prohibited-list/",
      "title": "2022 Prohibited List advisory"
    },
    {
      "url": "https://www.fda.gov/drugs/human-drug-compounding/certain-bulk-drug-substances-use-compounding-may-present-significant-safety-risks",
      "title": "FDA, bulk drug substances that may present significant safety risks (503A Category 2)"
    },
    {
      "url": "https://www.govinfo.gov/content/pkg/FR-2026-04-16/pdf/2026-07361.pdf",
      "title": "Federal Register, Pharmacy Compounding Advisory Committee notice of meeting (April 16, 2026)"
    },
    {
      "url": "https://www.biospace.com/fda/fda-mulls-compounding-for-peptides-previously-flagged-over-safety-risks",
      "title": "BioSpace coverage of the FDA peptide review"
    }
  ],
  "xiaflex-collagenase": [
    {
      "url": "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=805cecd0-fd1f-11dd-87af-0800200c9a66",
      "title": "Xiaflex prescribing information (DailyMed)"
    },
    {
      "url": "https://pubmed.ncbi.nlm.nih.gov/23376148/",
      "title": "Gelbard et al., IMPRESS I and II, J Urol 2013"
    },
    {
      "url": "https://www.auanet.org/guidelines-and-quality/guidelines/peyronies-disease-guideline",
      "title": "AUA Peyronie's Disease Guideline"
    },
    {
      "url": "https://pubmed.ncbi.nlm.nih.gov/28612401/",
      "title": "Abdel Raheem et al., shortened CCH protocol, BJU Int 2017"
    },
    {
      "url": "https://pubmed.ncbi.nlm.nih.gov/19726771/",
      "title": "Hurst et al., CORD I (Dupuytren's), NEJM 2009"
    },
    {
      "url": "https://www.ncbi.nlm.nih.gov/books/NBK560628/",
      "title": "StatPearls: Peyronie Disease"
    }
  ]
};
