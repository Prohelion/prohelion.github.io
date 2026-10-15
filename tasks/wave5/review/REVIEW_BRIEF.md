# Wave 5 reviewer brief: find invented facts

You are an independent reviewer. A writer split, merged and rewrote Profinity 2.3 docs pages. A detector listed the sentences in the new pages that do not appear (after normalising case and markdown) anywhere in the 2.3 docs as committed at HEAD. Your job is to judge each listed sentence.

Repo: /Users/ctuesley/Work/Profinity-Docs. Docs root: docs/Profinity_Software/Profinity_Version_2.3/. Original of any page: `git show HEAD:docs/Profinity_Software/Profinity_Version_2.3/<path>` (also `git grep -n "<phrase>" HEAD -- docs/Profinity_Software/Profinity_Version_2.3` to find where text came from). Read-only: change no file and run no state-changing git command.

For EVERY sentence in your batch file, open the new page, find the sentence, find its source in the HEAD docs, and give one verdict:
- GLUE: navigation or framing that states no product fact (for example "Refer to X for Y", a page-intro sentence that only names what the page covers, or a link sentence).
- REWORD: the same fact as the original, reworded or reflowed, with the same meaning, value and strength. Warnings must keep full strength.
- NEW-FACT: states something the HEAD docs do not state (a value, behaviour, step, prerequisite, permission, check, result, limitation or default), or changes meaning, or weakens a warning, or merges two facts into one that the original did not claim.

Also report: any step or check that looks invented in a task page; any page that is thin or only repeats another page (under about 150 words of real content); any heading whose old anchor was linked from elsewhere and now breaks (the build already has 0 broken anchors, so only mention it if you see a reader-visible loss).

Write your report to the path given in your assignment: a short table `file | sentence (first 12 words) | verdict | evidence`, but list GLUE and REWORD items only as counts per file. List every NEW-FACT in full with the original text it departs from, and a proposed fix (delete, restore the original wording, or "needs product owner"). Final reply: report path and a five-line summary with the NEW-FACT count.
