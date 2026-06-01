# FieldOps Ledger Trusted User Setup Checklist

## 1. Purpose

This checklist prepares FieldOps Ledger, Google Sheets, and Google Calendar for limited trusted-user testing.

This is not a public release checklist.

## 2. Trusted User Boundary

Each trusted user must use their own:

- FieldOps Ledger app data
- Google Sheet copy
- dedicated FieldOps Ledger calendar
- Google account permissions

No trusted user should depend on a shared master sheet or shared calendar.

## 3. Share Package

Each trusted user should receive only the items needed for testing:

- FieldOps Ledger app link
- their copied Google Sheet link
- deployed Apps Script Web App `/exec` URL for their copied Sheet
- import token for their copied Sheet, shared separately from the Sheet link when possible
- name of the dedicated FieldOps Ledger calendar they should use for testing
- trusted-user instructions doc
- reminder to download a JSON backup before testing destructive flows

Do not send:

- the owner's master Sheet
- shared calendar access to the owner's calendar
- GitHub tokens or private repo credentials
- instructions for AI, OCR, backend, login, or cloud sync

## 4. Before Sharing

Confirm:

- FieldOps Ledger app is live and updated
- Google Sheet template is clean
- test CSV import works
- CalendarEvents staging works
- ScheduleConfig values are reviewed
- generated rotation events use the name On Call Rotation
- generated timesheet events include Sunday reminder and Tuesday due dates before Friday payday
- generated timesheet events are validated across month/year boundaries
- duplicate prevention is active
- event IDs persist after sync
- calendar cleanup/regeneration path is understood

## 5. Sheet Safety

Before giving a tester access:

- make a fresh copy of the Sheet template
- rename the copy for that tester
- confirm RawData is empty or demo-safe
- protect formula/helper areas where possible
- leave only approved input/config areas editable
- confirm Timesheet output still works after import

## 6. Trusted Sheet Send Safety

Before giving a tester access:

- confirm the tester's Sheet has a deployed Apps Script Web App URL ending in `/exec`
- confirm the tester receives the deployed `/exec` Web App URL, not the Apps Script editor URL
- confirm FieldOps Ledger may save the Web App URL locally on that tester's device
- confirm the import token is entered only when sending
- confirm the import token is not saved by FieldOps Ledger
- confirm the tester Sheet is a copied tester Sheet, not the owner/master Sheet
- confirm phone, laptop, and desktop browser data are separate

## 7. Calendar Safety

Before syncing events:

- confirm the tester has the dedicated FieldOps Ledger calendar name from their share package
- sync only to that named dedicated FieldOps Ledger calendar
- do not sync to the tester's personal/default calendar
- run a small test sync before bulk sync
- confirm duplicate prevention by syncing the same small set twice
- confirm events can be deleted/regenerated safely
- confirm renamed/regenerated events do not silently remove old Calendar events

## 8. Paired-System Evidence

Before sharing a Sheet copy with a trusted user, record the validation evidence:

- Google Sheets template name or copied Sheet name
- validation date
- CSV schema version tested
- Bucking sample result
- Torque Turn sample result
- RawData import result
- helper-sheet refresh result
- Timesheet output result
- CalendarEvents generation result
- duplicate sync result
- breaking-change status

Generic notes such as "Sheets worked" are not enough.

## 9. User Instructions To Give Tester

Tell the tester:

- their app data stays in their browser
- phone and computer data are separate
- JSON backup/import is the transfer method
- the Sheet is downstream from FieldOps Ledger export
- Calendar is only a scheduling display
- deleting Calendar events does not delete FieldOps Ledger app records
- tax estimates are planning only, not tax advice

## 10. Recovery Plan

If something breaks:

- make a new Sheet copy from the clean template
- clear test Calendar events from the dedicated FieldOps Ledger calendar
- manually remove old renamed events, such as prior Workweek events, before resyncing renamed On Call Rotation events
- re-import the CSV into RawData
- regenerate CalendarEvents
- sync again only after reviewing staged rows

## 11. Definition Of Ready

Use `docs/FIELDOPS_LEDGER_TRUSTED_USER_RELEASE_READINESS.md` as the trusted-user release boundary before sharing.

Do not maintain a second readiness gate in this setup checklist. Record setup evidence here, then use the release-readiness doc for the final share/no-share decision.
