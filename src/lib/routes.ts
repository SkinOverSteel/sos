/**
 * Situation routes into the library, shared by the homepage and the /learn
 * hub. Where a reader starts is a function of where they're stuck, not of the
 * article taxonomy: each route names the situation it's best for and the
 * concrete thing the reader leaves with, then hands them the first article in
 * that path. The one non-/learn route is deliberate: the crisis path belongs
 * one tap away, not buried mid-list.
 */
export type Route = {
  title: string;
  bestFor: string;
  leavesWith: string;
  href: string;
  startWith: string;
};

export const ROUTES: Route[] = [
  {
    title: "First sign, no answers",
    bestFor:
      "Something has changed and you can't explain it: weaker erections, less interest, a signal you don't know how to read.",
    leavesWith:
      "Why the change is worth a workup, and the full map of that workup before you book anything.",
    href: "/learn/erectile-function-signal",
    startWith: "Erectile function is a signal",
  },
  {
    title: "Labs in hand, no context",
    bestFor:
      "A PDF full of numbers and reference ranges, and nobody has told you what any of it means.",
    leavesWith:
      "Enough fluency in testosterone, SHBG, insulin, and inflammation markers to hold a real conversation with your clinician.",
    href: "/learn/read-your-labs",
    startWith: "Read your labs",
  },
  {
    title: "Weighing treatment",
    bestFor:
      "Choosing between the pills, daily versus on-demand, testosterone, or what comes next when pills stop working.",
    leavesWith:
      "The honest comparisons, the safety rules, and the dosing literacy to follow a prescription with your eyes open.",
    href: "/learn/pde5-lineup",
    startWith: "The PDE5 line-up",
  },
  {
    title: "Quoted a price",
    bestFor:
      "A $400 quote on a $3 molecule, a subscription you can't unwind, or a stack of charges you can't parse.",
    leavesWith:
      "The cost stack unpacked, layer by layer, and the legal levers that bring the price down.",
    href: "/learn/what-it-costs",
    startWith: "What it costs",
  },
  {
    title: "Something went wrong",
    bestFor:
      "An erection that has lasted too long, a reaction that worries you, or a question that needs an answer tonight.",
    leavesWith:
      "The rescue ladder by the clock, what the ER actually does, and crisis resources one tap away.",
    href: "/support",
    startWith: "Support",
  },
];
