const { addNewMessages } = require("../../src/utils/messages");

describe("Add messages", () => {
  it("Returns original messages if no new messages", () => {
    const messages = {
      first: { defaultMessage: "First text" },
      second: { defaultMessage: "Second text" },
    };
    const currentMessages = {
      first: { defaultMessage: "", sourceMessage: "First text" },
      second: { defaultMessage: "", sourceMessage: "Second text" },
    };

    const mergedMessages = addNewMessages(messages, currentMessages);

    expect(mergedMessages).toEqual(currentMessages);
  });

  it("Adds only messages that aren't already in the catalog", () => {
    const messages = {
      first: { defaultMessage: "First text" },
      second: { defaultMessage: "Second text" },
    };
    const currentMessages = {
      first: { defaultMessage: "", sourceMessage: "First text" },
    };

    const mergedMessages = addNewMessages(messages, currentMessages);

    expect(mergedMessages).toEqual({
      first: { defaultMessage: "", sourceMessage: "First text" },
      second: { defaultMessage: "", sourceMessage: "Second text" },
    });
  });

  it("Inits catalog if empty", () => {
    const messages = {
      first: { defaultMessage: "First text" },
      second: { defaultMessage: "Second text" },
    };
    const currentMessages = {};

    const mergedMessages = addNewMessages(messages, currentMessages);

    expect(mergedMessages).toEqual({
      first: { defaultMessage: "", sourceMessage: "First text" },
      second: { defaultMessage: "", sourceMessage: "Second text" },
    });
  });

  it("Preserves existing translations", () => {
    const messages = {
      first: { defaultMessage: "First text" },
      second: { defaultMessage: "Second text" },
    };
    const currentMessages = {
      first: {
        defaultMessage: "First translation",
        sourceMessage: "First text",
      },
    };

    const mergedMessages = addNewMessages(messages, currentMessages);

    expect(mergedMessages).toEqual({
      first: {
        defaultMessage: "First translation",
        sourceMessage: "First text",
      },
      second: { defaultMessage: "", sourceMessage: "Second text" },
    });
  });

  it("if key is duplicated message is overwritten with the new one", () => {
    const messages = {
      first: { defaultMessage: "First text" },
      second: { defaultMessage: "Second text" },
    };
    const currentMessages = {
      first: {
        defaultMessage: "First translation",
        sourceMessage: "Old text",
      },
    };

    const mergedMessages = addNewMessages(messages, currentMessages);

    expect(mergedMessages).toEqual({
      first: { defaultMessage: "", sourceMessage: "First text" },
      second: { defaultMessage: "", sourceMessage: "Second text" },
    });
  });

  it("Allows duplicated texts with different keys", () => {
    const messages = {
      newKey: { defaultMessage: "First text" },
    };
    const currentMessages = {
      oldKey: {
        defaultMessage: "",
        sourceMessage: "First text",
      },
    };

    const mergedMessages = addNewMessages(messages, currentMessages);

    expect(mergedMessages).toEqual({
      oldKey: { defaultMessage: "", sourceMessage: "First text" },
      newKey: { defaultMessage: "", sourceMessage: "First text" },
    });
  });
});
