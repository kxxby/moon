# Releasing Moon Client

Moon Client 1.0.1 targets Minecraft 1.21.11, Fabric Loader 0.19.0 or newer,
Fabric API for 1.21.11, and Java 21 or newer.

## Owner switch

Edit [control.json](https://github.com/kxxby/moon/edit/main/control.json) in the
**main branch** of **kxxby/moon**, then commit the change:

```json
{
  "schemaVersion": 1,
  "enabled": false,
  "message": "Moon Client is private again. Thanks for trying it."
}
```

Set `enabled` to `true` and commit to enable it again. `message` is optional;
it is shown when `enabled` is false. Keep `schemaVersion` at the number `1` and
use a JSON boolean, not the text `"false"`. Never put credentials in this file.

The fixed endpoint in released JARs is
`https://raw.githubusercontent.com/kxxby/moon/main/control.json`.
Changing a local copy of the JSON does not change released clients. The owner
controls it through GitHub's authenticated editor; players only read a public URL.

Every production launch starts suspended until an HTTPS request returns a valid
enabled policy. Checks run in the background every 60 seconds with a 10-second
timeout. A failed request, HTTP error (including 404), invalid JSON or disabled
policy suspends features. A successful permission expires after 90 seconds even
if a check hangs. There is no persistent permission cache or offline grace period.
GitHub/CDN propagation may add delay; this is not an instantaneous global switch.

Module cleanup runs on the Minecraft thread. Saved enabled preferences remain
intact and features resume after verification succeeds again. Active automation,
RPC and the companion bridge stop; a world download already in progress finishes
writing its captured data. Replay/photo sessions release their controls. Minecraft
continues running. Right Shift and `/moonaccess` allow checking the status/retrying.
Retries have a five-second throttle and never overlap an existing request.

Making **kxxby/moon private**, deleting `control.json`, renaming the repository or
removing its `main` branch makes normal production checks fail. To intentionally
withdraw access, commit `enabled: false` while the repository is still public and
allow time for it to propagate before making the repository private. Keeping the
repository public lets you display your custom explanation and re-enable copies
later without changing the URL. The source can remain private: the public release
repository needs only release documentation, this control file and downloadable
binaries. A repository visibility change is separate from this runtime switch.

This check sends no Minecraft identity, server address, inventory, chat, hardware
ID or API credential. GitHub receives ordinary HTTPS request metadata including
the connecting IP address. The policy is data only; no remote code is executed.
There is no Discord requirement. Patched copies and builds released before this
check was added cannot be controlled this way. Fabric development runs bypass the
check so local tests and development remain possible; production JARs have no
config option or JVM property to bypass it.

## Build and upload

```powershell
./gradlew.bat build
./launcher/build.ps1 -Test
cd companion
npm test
npm run test:renderer
npm run dist
cd ..
./scripts/prepare-release.ps1
./scripts/publish-release.ps1 -Publish -MakePublic
```

Set `JAVA_HOME` to an installed JDK if necessary. The publisher uses Git Credential
Manager's existing GitHub login in memory; it never writes a token into the mod,
repository, archive or a file. It publishes the exact files staged under
`build/release/1.0.1`, first creates a draft release, uploads its assets and then
publishes it. `-MakePublic` explicitly changes kxxby/moon to public. Run the script
without `-Publish` to inspect the remote repository without changing anything.

The package list is explicit: the remapped production mod JAR, launcher ZIP,
companion ZIP, three optional resource packs, install notes, licenses and SHA-256
checksums. Sources JARs, test mods, imported server plugins, personal settings,
development logs and backups are excluded. Do not manually upload everything in
`build/libs`.

This release uses the proprietary license in `LICENSE`. Third-party fonts and
Fabric API retain their own licenses. Copies already distributed under CC0 retain
their existing permissions; changing this release's license is not retroactive.

Before publishing, verify the remapped release in a real Fabric instance: startup
with `enabled: true`; Right Shift and HUD features; disabling during an active
session; preferences after relaunch; reconnecting and re-enabling; and unavailable
endpoint/network. Unit tests cover policy parsing, timeout/lease state, body limits
and module lifecycle. A build/test result does not prove every mixin's runtime
compatibility with every other mod.
