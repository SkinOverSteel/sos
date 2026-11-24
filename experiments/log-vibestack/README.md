# Skin Over Steel Log VibeStack pilot

The [spec](spec/index.md) models the Log's existing workflow. It uses synthetic ratings and tracks only whether an intervention and outcome exist and how many check-ins remain. The [browser tests](../../e2e/log.spec.ts) exercise the real Next.js page, including local storage across reloads.

A member can close a log as soon as an intervention exists. They can also add a check-in while the log is closed and reopen it with its remaining check-ins intact. Removing a check-in leaves the log open or closed as it was. The pilot models records created through the form. Backup decoding, field contents, clinician export, and treatment guidance are outside the model.

## Run the pilot

Use Node 26, [Dafny 4.11](https://github.com/dafny-lang/dafny/releases/tag/v4.11.0), and pnpm 10.24.0. Run these commands from the Skin Over Steel checkout. The first VibeStack check may download Quint's Rust evaluator.

```bash
git clone https://github.com/lalalune/vibestack.git ../vibestack
git -C ../vibestack checkout 1acbe9b2c2d198b1e479d475bf1ba85e4a5a6b41
pnpm --dir ../vibestack install --frozen-lockfile --ignore-scripts
node ../vibestack/vibestack/spec.ts check experiments/log-vibestack
```

The spec awaits approval, so the review stage reports pending items. To test the counterexample, copy the pilot spec to a temporary directory and remove `log.hasIntervention and` from `canClose`. Run the same check against that directory. Closing an empty baseline should violate the intervention invariant.

Run the browser comparison separately with Chromium installed. Set `PW_CHROMIUM` to use a system Chromium.

```bash
npm ci
npm run build
npm run test:e2e -- e2e/log.spec.ts
```
