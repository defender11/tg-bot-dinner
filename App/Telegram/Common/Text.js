export default {
  /**
   * Escapes special Markdown characters in text for Telegram's Markdown mode
   * @param {string} text - The text to escape
   * @return {string} - The escaped text safe for Telegram Markdown
   */
  escapeMarkdown: function (text) {
    // Characters that need escaping in Telegram Markdown
    const specialChars = ['_', '*', '`', '[', ']', '(', ')', '#', '+', '-', '.', '!'];
    
    // Create a RegExp that matches any of these special characters
    const regex = new RegExp(`[${specialChars.map(char => '\\' + char).join('')}]`, 'g');
    
    // Replace each special character with its escaped version
    return text.replace(regex, '\\$&');
  },
  
  /**
   * Escapes Markdown text while preserving code blocks
   * @param {string} text - The text containing Markdown and possibly code blocks
   * @return {string} - Text with special characters escaped but code blocks preserved
   */
  escapeMarkdownWithCodeBlocks: function (text) {
    // Store code blocks
    const codeBlocks = [];
    
    // Replace code blocks with placeholders
    const withoutCodeBlocks = text.replace(/```([\s\S]*?)```/g, (match, codeContent) => {
      const placeholder = `__CODE_BLOCK_${codeBlocks.length}__`;
      codeBlocks.push(match);
      return placeholder;
    });
    
    // Replace inline code with placeholders
    const withoutInlineCode = withoutCodeBlocks.replace(/`([^`]+)`/g, (match, codeContent) => {
      const placeholder = `__INLINE_CODE_${codeBlocks.length}__`;
      codeBlocks.push(match);
      return placeholder;
    });
    
    // Escape Markdown in the remaining text
    const escapedText = this.escapeMarkdown(withoutInlineCode);
    
    // Restore code blocks
    let finalText = escapedText;
    for (let i = 0; i < codeBlocks.length; i++) {
      finalText = finalText.replace(
        `__CODE_BLOCK_${i}__`,
        codeBlocks[i]
      ).replace(
        `__INLINE_CODE_${i}__`,
        codeBlocks[i]
      );
    }
    
    return finalText;
  },
  
  /**
   * Escapes text for Telegram's MarkdownV2 format which requires more characters to be escaped
   * @param {string} text - The text to escape for MarkdownV2
   * @return {string} - The escaped text
   */
  escapeMarkdownV2: function (text) {
    // Characters that need escaping in Telegram MarkdownV2
    const specialChars = ['_', '*', '[', ']', '(', ')', '~', '`', '>', '#', '+', '-', '=', '|', '{', '}', '.', '!'];
    
    // Create a RegExp that matches any of these special characters
    const regex = new RegExp(`[${specialChars.map(char => '\\' + char).join('')}]`, 'g');
    
    // Replace each special character with its escaped version
    return text.replace(regex, '\\$&');
  }
}