---
title: "Is online OCR private? What happens to your images and what to check"
description: "What typically happens to an image you upload for OCR, what to look for in a privacy policy, and how to check for yourself that a tool keeps files local."
summary: "Where your image goes when you use an online OCR tool, the privacy policy questions worth asking, and a simple way to verify on-device processing yourself."
published: 2026-10-03
tool: pdf-to-text
order: 9
---

The images people run through OCR are often private: ID cards, bank statements, medical letters, contracts, screenshots of personal chats. Whether an online tool is "private" comes down to two questions. Where is the image read? And what happens to it, and to the text, afterward?

This guide isn't a verdict on any particular service. Many handle files carefully. It's a way to find out for yourself, so you can choose the right tool for each document.

## What usually happens when you upload an image

Online OCR tools work in one of two ways, and some mix both.

### Server-side processing

Most online tools send your image to their servers to be read. Your browser uploads the file, usually over an encrypted HTTPS connection, the server runs OCR, and the text comes back to the page. Along the way:

- The file exists on at least one server, and may be written to storage while it waits in a processing queue.
- Server logs typically record details of each request, such as time, IP address and file size, and sometimes more.
- Backups may keep copies for a while, even after the main copy is deleted.
- The service may pass the image to other companies it relies on, such as a cloud hosting provider or a third-party OCR or AI service, each with its own terms.
- Staff may be able to access files for support or debugging.
- Depending on the policy, files or extracted text may be used to improve the service, which can include training models.

None of this is automatically a problem. A service can delete files promptly, restrict access and never train on them. The point is that you're relying on its policy and on its practices matching that policy.

### On-device processing

Some tools download the OCR engine into your browser and read the image on your own device. The image is never sent to the service, so questions about retention, logs and training simply don't apply to it.

### Built-in features vary too

The OCR features in operating systems differ. Apple describes Live Text as working on device, and Microsoft says the Snipping Tool's text recognition runs locally. Google's help page for Chromebook Plus Text capture says the selected area is sent to Google's servers. The documentation for each feature is the place to check. The [screenshot guide](/guides/how-to-extract-text-from-a-screenshot) covers how to use them.

## What to check in a privacy policy

Read the policy with these questions in mind.

- **Where is the image processed?** Look for phrases like "uploaded to our servers" or "processed in your browser" or "on your device". Vague wording here is itself an answer.
- **How long is it kept?** A specific window, like "deleted after one hour", is more meaningful than "as long as necessary". Check whether the window also covers backups and logs.
- **Is it used for training or "improving our services"?** If so, find out whether you can opt out, and whether that covers files you've already uploaded.
- **Who else handles it?** Look for a list of sub-processors or third parties, such as hosting, OCR or AI providers and analytics.
- **What about the extracted text?** Some policies talk about uploaded files but say nothing about the text produced from them.
- **Where are the servers?** The country where data is processed decides which laws apply to it.
- **Is history stored in an account?** Saved results tied to an account live on a server until you delete them.
- **Who else is on the page?** Ad networks and analytics scripts on a page receive information about your visit. They don't normally receive your image, but they're worth knowing about.
- **Is the policy specific and current?** A dated, detailed policy is a better sign than a generic template.

Remember that a privacy policy is a statement of intent, not proof. For on-device tools, you can check the claim yourself.

## How on-device processing differs

When OCR runs in your browser, the confidentiality of the image doesn't depend on anyone else's servers, staff or retention schedule. There are trade-offs: the first visit downloads the engine and language data, and reading speed depends on your device, so an older phone takes longer.

Your device still matters. Results can end up in places you control but might forget about: browser storage if you turn on a history feature, your downloads folder, and your clipboard. Clipboard history on Windows (Windows+V) and clipboard syncing between devices can keep copies of what you copied.

## How to check for yourself

### Watch the Network tab

Browsers include developer tools that show every request a page makes. You don't need to be a developer to use them.

1. Open the tool in a desktop browser. In Safari, first turn on the developer features in Safari's Advanced settings.
2. Open the developer tools: F12 or Ctrl+Shift+I on Windows and Linux, ⌘+Option+I on a Mac.
3. Select the Network tab, clear the list, and turn on the option to preserve the log if there is one.
4. Add an image and let the tool read it.
5. Look at the requests that appear. An upload usually shows as a POST or PUT request with a size close to your image's file size. Sorting by size makes large outgoing requests easy to spot.

With an on-device tool, you may see the engine and language files being downloaded on first use, and perhaps small analytics requests, but nothing the size of your image going out. Keep the panel open for a minute after reading, and check all request types, since data can also be sent in chunks or over a WebSocket connection.

### Try it offline

Load the page and read one image, so the engine and language data are cached. Then turn off Wi-Fi or switch on airplane mode and read another. If it still works, the reading is happening on your device.

The offline test is quick but not conclusive on its own, because a page could store an image and send it later. The Network tab is the stronger check.

[Image to Text App](/) runs its OCR on your device in exactly this way, and you're welcome to verify it with both tests. The details are on its [privacy page](/privacy).

## Advice for sensitive documents

- **Prefer on-device processing** for IDs, medical records, financial statements and legal documents.
- **Remove what you don't need.** If you only need the address from a letter, crop out the account number. With a server-based tool, crop before uploading, because cropping inside the tool happens after the upload.
- **Avoid shared and public computers.** If you have to use one, leave any history feature off, close the tab when you're done, and delete downloaded files.
- **Clear your clipboard history** after copying sensitive text, especially if it syncs between devices.
- **Think before sharing results.** A link that packs the text into the part of the address after the # isn't sent to the website's server when someone opens it. But anyone who has the link can read the text, and chat apps keep the links you send. Treat the link like the document.
- **Check your browser extensions.** Extensions with access to all websites can read the content of the pages you visit. For very sensitive documents, use a browser profile without extensions, or a private window, where most browsers turn extensions off unless you've allowed them.

Scanned paperwork is where these questions come up most. For handling scans and PDFs, see the [PDF to text](/pdf-to-text) page.
