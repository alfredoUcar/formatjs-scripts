function getAvailableTranslationForMessage(id, originalText, currentMessages) {
  if (!(id in currentMessages)) {
    // message not found
    return null;
  }

  const message = currentMessages[id];

  if (originalText !== message.sourceMessage) {
    // message exists but original text has changed, translation is obsolete
    return null;
  }

  return message.defaultMessage;
}

function addNewMessages(extractedMessages, currentMessages) {
  if (!Object.keys(currentMessages).length) {
    currentMessages = extractedMessages;
  }

  let mergedMessages = {};
  for (let id in extractedMessages) {
    mergedMessages[id] = {};
    mergedMessages[id].defaultMessage = extractedMessages[id].defaultMessage;
    if (currentMessages[id] && currentMessages[id].description) {
      mergedMessages[id].description = currentMessages[id].description;
    }
    mergedMessages[id].sourceMessage = extractedMessages[id].defaultMessage;

    const translation = getAvailableTranslationForMessage(
      id,
      extractedMessages[id].defaultMessage,
      currentMessages
    );
    if (translation) {
      mergedMessages[id].defaultMessage = translation;
    } else {
      // keep it blank for translators
      mergedMessages[id].defaultMessage = "";
    }
  }

  for (let id in currentMessages) {
    if (!(id in extractedMessages)) {
      // preserve message even if not present on extracted messages
      mergedMessages[id] = currentMessages[id];
    }
  }

  return mergedMessages;
}

exports.addNewMessages = addNewMessages;
