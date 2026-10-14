# Moon Client

A Minecraft **1.21.11** client mod with combat HUDs, fight statistics, cosmetics,
maps, building tools and a configurable interface. Some optional modules automate
actions; check your server's rules before enabling those features.

## Install

1. Install Minecraft 1.21.11 with Fabric Loader 0.19.0 or newer and Java 21+.
2. Download `moonclient-1.0.1.jar` from [Releases](https://github.com/kxxby/moon/releases/latest).
3. Put the JAR and **Fabric API for Minecraft 1.21.11** in that instance's `mods` folder.
4. Launch Minecraft and press **Right Shift** to open Moon Client.

The optional Windows launcher installs the included Moon/Fabric API JARs into a
separate Prism Launcher instance. Minecraft, Prism and an authenticated account
are separate requirements. The launcher executable is unsigned.

For the optional Companion app on Windows, run **MoonCompanion-Setup-2.1.0.exe**
from the release. It bundles Node.js and adds desktop/Start Menu shortcuts.
It requires 64-bit Windows 10/11, .NET Framework 4.8 and Edge or Chrome.
The portable Companion ZIP requires Node.js 22+; extract it and run `start.bat`.
Enable **Companion App** in Moon Client to connect.
Optional resource-pack ZIPs can be installed in Minecraft's `resourcepacks` folder.

## Online availability

Moon Client requires internet access to read this repository's public `control.json`.
The owner can disable the mod remotely. If disabled or the check cannot be completed,
Moon features suspend and Minecraft remains usable. Saved settings are preserved.
Checks run every 60 seconds; permissions expire after 90 seconds. Press Right Shift
or run `/moonaccess` to view availability and try again. GitHub outages can suspend
the mod too. Making this repository private makes the check fail.

Availability requests send no Minecraft identity, server address, inventory, chat
or hardware ID. GitHub receives ordinary HTTPS connection metadata, including your
IP address. The response controls availability only and cannot execute remote code.
Optional AI features require your own key and make requests when you use them;
Discord Rich Presence and the local Companion bridge are optional integrations.

## License and support

This release is free to use under the included [proprietary license](LICENSE).
Redistribution and modification require the owner's permission, except where
applicable law or a third-party license permits otherwise. Fonts and bundled Fabric
API retain their own licenses; see [third-party notices](THIRD-PARTY.md).

Report problems through [GitHub Issues](https://github.com/kxxby/moon/issues), including
your Minecraft/Fabric versions and the relevant error. Remove credentials and
personal information before attaching logs.

Moon Client is an independent project and is not affiliated with Mojang, Microsoft,
FabricMC, Prism Launcher or Discord.
