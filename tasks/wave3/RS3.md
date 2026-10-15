# RS3: review of Tag_Relays setup split

Pages: Components/Tag_Relays/index.md, Set_Up_a_Tag_Relay.md (new), Tag_Relay_Sender.md, Tag_Relay_Receiver.md. Nothing edited.

## Set_Up_a_Tag_Relay.md: PASS
1. Fact preservation (low, none lost). Compared against HEAD index "Setting up a relay": all seven steps are character-identical, including the Collections link, bold labels, JWT, permission, Bearer token, Auto Connect, Start Sender and Snapshot interval. The troubleshooting sentence with both `#troubleshooting` links is identical. The intro "To set up a first relay:" is replaced by the new purpose sentence (allowed). Each item exists once, on the new page; the old section is gone from index.
2. No invented steps (pass). Added text is two sentences. Purpose: "This page sets up a first Tag Relay, so that tags on a sending Profinity instance appear on a receiving instance." Prerequisites: "Both components require the **Data Relay** licensed feature on the instance they run on, and the HTTPS protocol needs a user with the **Receive external tags** permission on the receiving instance." Both come from the old index licence admonition and step 3. No step, check or result is new. The licence sentence now appears on two pages (index admonition and here): a deliberate, minor overlap, and it omits the Server/Enterprise edition detail, which stays on index. Not a loss.
3. Seven versus original four (pass). Original (d5daebe^, "Setting Up a Relay") had four steps. Mapping: original 1 = new 1; original 2 = new 2 + new 3 (receiver and prefix; then HTTPS user and JWT); original 3 = new 4 + new 5 (sender; then Bearer token); original 4 = new 6 + new 7 (start if Auto Connect off; wait and confirm). Order and content are faithful, nothing added or dropped. Only wording changes from the original: step 6 now reads "If **Auto Connect** is off, select **Start Sender**" (was "Start the sender with **Start Sender** if **Auto Connect** is off"); same meaning, low. The JWT is noted before the sender exists, as in the original.
4. Style (low). Type task fits. One sentence per line. Lint clean.

## index.md: FIX (one medium)
1. Medium. Front matter `description` still says "and set up a first relay over HTTPS or MQTT". The page no longer contains setup steps, and S3.md says the description no longer promises setup. It does, in the file. Suggest: "Share live tags between Profinity instances with a Tag Relay Sender and a Tag Relay Receiver, over HTTPS or MQTT." Check it still meets 70 to 160 characters.
2. Concept page check (pass). One sentence and a link remain: "To set up a first relay, refer to [Set up a tag relay](Set_Up_a_Tag_Relay.md)." The diagram figure (PNG, alt text and figcaption) is unchanged, along with the components table, prefix paragraph, Sparkplug note, category line and licence admonition. The `type` is now `concept`, which fits. The Tag Relay concept link is kept.
3. Low. `last_reviewed` is 2026-10-14 on a changed page; the brief's front matter rule says 2026-10-15 for new pages, so this is optional.

## Tag_Relay_Sender.md and Tag_Relay_Receiver.md: PASS
Diff against HEAD is one line each: `[Tag Relays](index.md) describes ...` became `[Set up a tag relay](Set_Up_a_Tag_Relay.md) describes ...`. Correct target, and the sentence still reads well ("how to set up a first relay end to end"). No other change.

## Links and lint
- Inbound: `grep` for `Tag_Relays/index.md#` and `setting-up-a-relay` outside 2.0 to 2.2 finds nothing. Other pages (MQTT_Subscriber, Publishers_and_Subscribers/index, Cloud_Dashboard/index, Licensing) link to `Tag_Relays/index.md` without an anchor, and the page still exists. No inbound links to fix.
- Whole-2.3 `lint-docs.js`: 4 Links errors, all elsewhere (Image.md anchors #layers, #action-invocation, #display-types; Rules.md anchor #alert-level). None relate to Tag_Relays.
- The four pages: 0 errors, 0 warnings, 0 notes.
- `.pages` now lists Set_Up_a_Tag_Relay.md (the writer was not meant to edit it; the lead may have done it). Note this as unexpected relative to the brief.

## Summary
No facts lost, none invented; the seven steps faithfully split the original four. The one fix needed is the index description, which still promises setup. Links and lint are clean for the four pages. No high-severity findings.
