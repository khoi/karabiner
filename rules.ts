import fs from "fs";
import { KarabinerRules } from "./types";
import { createHyperSubLayers, app, open, rectangle, shell } from "./utils";

const rules: KarabinerRules[] = [
  // Define the Hyper key itself
  {
    description: "Hyper Key (⌃⌥⇧⌘) / ESC (tap)",
    manipulators: [
      {
        description: "Caps Lock -> Hyper Key",
        from: {
          key_code: "caps_lock",
          modifiers: {
            optional: ["any"],
          },
        },
        to: [
          {
            set_variable: {
              name: "hyper",
              value: 1,
            },
          },
        ],
        to_after_key_up: [
          {
            set_variable: {
              name: "hyper",
              value: 0,
            },
          },
        ],
        to_if_alone: [
          {
            key_code: "escape",
          },
        ],
        type: "basic",
      },
    ],
  },
  ...createHyperSubLayers({
    // o = "Open" applications
    o: {
      1: app("1Password"),
      a: app("Arc"),
      x: app("Xcode"),
      c: app("Cursor"),
      s: app("Slack"),
      t: app("WezTerm"),
      f: app("Finder"),
      w: open("WhatsApp"),
      e: open("Telegram"),
    },

    // s = "System"
    s: {
      u: {
        to: [
          {
            key_code: "volume_increment",
          },
        ],
      },
      j: {
        to: [
          {
            key_code: "volume_decrement",
          },
        ],
      },
      p: {
        to: [
          {
            key_code: "display_brightness_increment",
          },
        ],
      },
      o: {
        to: [
          {
            key_code: "display_brightness_decrement",
          },
        ],
      },
      k: {
        to: [
          {
            key_code: "play_or_pause",
          },
        ],
      },
    },

    v: {
      h: {
        to: [{ key_code: "left_arrow" }],
      },
      j: {
        to: [{ key_code: "down_arrow" }],
      },
      k: {
        to: [{ key_code: "up_arrow" }],
      },
      l: {
        to: [{ key_code: "right_arrow" }],
      },
      u: {
        to: [{ key_code: "page_up" }],
      },
      d: {
        to: [{ key_code: "page_down" }],
      },
    },

    // r = "Raycast"
    r: {
      c: open("raycast://extensions/thomas/color-picker/pick-color"),
      g: open("raycast://ai-commands/fix-spelling-and-grammar"),
      p: open("raycast://extensions/raycast/navigation/search-menu-items"),
      h: open(
        "raycast://extensions/raycast/clipboard-history/clipboard-history"
      ),
    },
  }),
];

fs.writeFileSync(
  "karabiner.json",
  JSON.stringify(
    {
      global: {
        show_in_menu_bar: false,
      },
      profiles: [
        {
          name: "Default",
          virtual_hid_keyboard: { keyboard_type_v2: "ansi" },
          complex_modifications: {
            rules,
          },
        },
      ],
    },
    null,
    2
  )
);
