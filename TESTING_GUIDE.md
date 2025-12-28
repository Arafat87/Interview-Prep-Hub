# Flashcard Generator Testing Guide

## Overview
This guide provides comprehensive testing instructions for the AI Flashcard Generator feature added to the Interview Questions App.

## Prerequisites
Before testing, ensure you have:
1. **API Keys configured** in Settings:
   - OpenAI API Key (for ChatGPT)
   - Anthropic API Key (for Claude)
2. **Test files** ready:
   - Sample TXT file with content (at least 100 characters)
   - Sample PDF file
   - Sample DOCX file

## Testing Checklist

### 1. Basic UI Testing

#### 1.1 Modal Opening/Closing
- [ ] Click "Generate Flashcards" button in header
- [ ] Verify modal opens with correct title "AI Flashcard Generator"
- [ ] Click X button to close modal
- [ ] Click outside modal to close
- [ ] Click "Cancel" button to close

#### 1.2 Tab Switching
- [ ] Verify "Upload File" tab is active by default
- [ ] Click "Paste Text" tab
- [ ] Verify content switches to text input area
- [ ] Click back to "Upload File" tab
- [ ] Verify content switches back to file upload

### 2. Text Input Testing

#### 2.1 Basic Text Generation
- [ ] Switch to "Paste Text" tab
- [ ] Paste sample text (minimum 100 characters)
- [ ] Verify character count updates
- [ ] Select a job category (e.g., "Software Engineer")
- [ ] Set flashcard count to 5
- [ ] Select "Technical" question type
- [ ] Select "Medium" difficulty
- [ ] Choose AI provider (Claude or ChatGPT)
- [ ] Click "Generate Flashcards"
- [ ] Verify progress screen appears
- [ ] Wait for generation to complete
- [ ] Verify preview screen shows 5 flashcards

#### 2.2 Text Validation
- [ ] Try generating with empty text
- [ ] Verify error: "Please enter some content"
- [ ] Try generating with very short text (< 100 chars)
- [ ] Verify error: "Content is too short"

### 3. File Upload Testing

#### 3.1 TXT File Upload
- [ ] Switch to "Upload File" tab
- [ ] Click on dropzone to browse
- [ ] Select a TXT file
- [ ] Verify file name and size display
- [ ] Click "Generate Flashcards"
- [ ] Verify text extraction works
- [ ] Verify flashcards are generated

#### 3.2 PDF File Upload
- [ ] Upload a PDF file
- [ ] Verify file name and size display
- [ ] Generate flashcards
- [ ] Verify PDF text extraction works
- [ ] Check generated flashcards quality

#### 3.3 DOCX File Upload
- [ ] Upload a DOCX file
- [ ] Verify file name and size display
- [ ] Generate flashcards
- [ ] Verify DOCX text extraction works
- [ ] Check generated flashcards quality

#### 3.4 Drag and Drop
- [ ] Drag a TXT file over dropzone
- [ ] Verify dropzone highlights (drag-over state)
- [ ] Drop the file
- [ ] Verify file is uploaded successfully

#### 3.5 File Validation
- [ ] Try uploading a file > 10MB
- [ ] Verify error: "File is too large"
- [ ] Try uploading invalid file type (e.g., .jpg)
- [ ] Verify error: "Invalid file type"
- [ ] Click "Remove" button on uploaded file
- [ ] Verify file is removed and dropzone reappears

### 4. Configuration Testing

#### 4.1 Flashcard Count Slider
- [ ] Move slider to 5
- [ ] Verify value displays "5"
- [ ] Move slider to 20
- [ ] Verify value displays "20"
- [ ] Generate with different counts
- [ ] Verify correct number of flashcards generated

#### 4.2 Question Type Options
- [ ] Generate with "Technical" type
- [ ] Verify all flashcards are Technical
- [ ] Generate with "Behavioral" type
- [ ] Verify all flashcards are Behavioral
- [ ] Generate with "Mixed" type
- [ ] Verify mix of Technical and Behavioral

#### 4.3 Difficulty Options
- [ ] Generate with "Easy" difficulty
- [ ] Verify all flashcards are Easy
- [ ] Generate with "Medium" difficulty
- [ ] Verify all flashcards are Medium
- [ ] Generate with "Hard" difficulty
- [ ] Verify all flashcards are Hard
- [ ] Generate with "Mixed" difficulty
- [ ] Verify mix of Easy, Medium, and Hard

#### 4.4 AI Provider Selection
- [ ] Generate with Claude (Anthropic)
- [ ] Verify generation works
- [ ] Generate with ChatGPT (OpenAI)
- [ ] Verify generation works
- [ ] Compare quality of outputs

### 5. Preview & Edit Testing

#### 5.1 Flashcard Selection
- [ ] Verify all flashcards are selected by default
- [ ] Verify "X selected" count is correct
- [ ] Uncheck one flashcard
- [ ] Verify count updates
- [ ] Click "Deselect All"
- [ ] Verify all checkboxes unchecked
- [ ] Verify count shows "0 selected"
- [ ] Click "Select All"
- [ ] Verify all checkboxes checked

#### 5.2 Edit Mode
- [ ] Click "Edit" button on a flashcard
- [ ] Verify question becomes editable textarea
- [ ] Verify answer becomes editable textarea
- [ ] Edit the question text
- [ ] Edit the answer text
- [ ] Click "Save" button
- [ ] Verify changes are saved
- [ ] Verify display updates with new text

#### 5.3 Navigation
- [ ] Click "Back" button
- [ ] Verify returns to input step
- [ ] Verify previous content is preserved
- [ ] Generate again
- [ ] Verify preview shows new flashcards

### 6. Save & Integration Testing

#### 6.1 Saving Flashcards
- [ ] Select 3 flashcards
- [ ] Click "Save Selected Flashcards"
- [ ] Verify toast notification appears
- [ ] Verify message shows correct count
- [ ] Verify modal closes
- [ ] Check main questions list
- [ ] Verify 3 new flashcards appear at top

#### 6.2 Stats Update
- [ ] Note total questions count before
- [ ] Save flashcards
- [ ] Verify total questions count increases
- [ ] Verify "Answered" count increases (AI-generated have answers)

#### 6.3 Category Tabs
- [ ] Generate flashcards for "Software Engineer"
- [ ] Save them
- [ ] Check "Software Engineer" tab
- [ ] Verify count increased
- [ ] Click on the tab
- [ ] Verify new flashcards appear

#### 6.4 Filtering
- [ ] Generate Technical flashcards
- [ ] Save them
- [ ] Click "Technical" filter pill
- [ ] Verify new flashcards appear
- [ ] Test difficulty filters
- [ ] Verify flashcards appear correctly

### 7. Error Handling Testing

#### 7.1 Missing API Keys
- [ ] Clear API keys in Settings
- [ ] Try to generate flashcards
- [ ] Verify error: "API key not configured"
- [ ] Verify redirected to Settings

#### 7.2 Network Errors
- [ ] Disconnect internet (if possible)
- [ ] Try to generate flashcards
- [ ] Verify appropriate error message
- [ ] Reconnect and try again

#### 7.3 Invalid AI Response
- [ ] (This is hard to test manually)
- [ ] If generation fails, verify error message
- [ ] Verify can return to input step

#### 7.4 Missing Configuration
- [ ] Try to generate without selecting category
- [ ] Verify error: "Please select a job category"

### 8. Responsive Design Testing

#### 8.1 Desktop (1920x1080)
- [ ] Open modal
- [ ] Verify layout looks good
- [ ] Test all features
- [ ] Verify no overflow issues

#### 8.2 Tablet (768px)
- [ ] Resize browser to 768px width
- [ ] Open modal
- [ ] Verify config grid stacks vertically
- [ ] Verify upload tabs stack
- [ ] Test all features

#### 8.3 Mobile (375px)
- [ ] Resize browser to 375px width
- [ ] Open modal
- [ ] Verify all elements are accessible
- [ ] Verify no horizontal scroll
- [ ] Test file upload
- [ ] Test text input

### 9. Dark Theme Testing

#### 9.1 Theme Switching
- [ ] Go to Settings
- [ ] Switch to Dark theme
- [ ] Open Flashcard Generator
- [ ] Verify colors are appropriate
- [ ] Verify text is readable
- [ ] Verify all UI elements visible
- [ ] Test complete workflow in dark theme

### 10. Edge Cases & Stress Testing

#### 10.1 Large Documents
- [ ] Upload a large PDF (5-10MB)
- [ ] Verify extraction works
- [ ] Verify generation completes
- [ ] Check flashcard quality

#### 10.2 Maximum Flashcards
- [ ] Set slider to 20
- [ ] Generate flashcards
- [ ] Verify exactly 20 are generated
- [ ] Verify all are unique

#### 10.3 Special Characters
- [ ] Use content with special characters (é, ñ, 中文, etc.)
- [ ] Verify extraction works
- [ ] Verify flashcards display correctly

#### 10.4 Very Long Content
- [ ] Paste very long text (10,000+ characters)
- [ ] Verify content chunking works
- [ ] Verify generation completes

## Expected Results Summary

### Success Criteria
✅ All modals open and close correctly
✅ File upload works for TXT, PDF, DOCX
✅ Drag and drop functionality works
✅ Text input and character counting works
✅ All configuration options work correctly
✅ AI generation produces valid flashcards
✅ Preview shows all generated flashcards
✅ Edit mode allows modifications
✅ Selection/deselection works correctly
✅ Saved flashcards appear in main list
✅ Stats and tabs update correctly
✅ Error messages are clear and helpful
✅ Responsive design works on all screen sizes
✅ Dark theme displays correctly

### Known Limitations
- Requires active internet connection for AI generation
- Requires valid API keys (OpenAI or Anthropic)
- PDF extraction quality depends on PDF structure
- Maximum file size: 10MB
- Minimum content length: 100 characters

## Reporting Issues

If you find any issues during testing, please note:
1. **What you were doing** (steps to reproduce)
2. **What you expected** to happen
3. **What actually happened** (error message, incorrect behavior)
4. **Browser and version** (if relevant)
5. **Screen size** (if responsive issue)

## Quick Test Scenario

For a quick smoke test, follow these steps:

1. **Open the app** in a browser
2. **Configure API key** in Settings (Claude or ChatGPT)
3. **Click "Generate Flashcards"** button
4. **Switch to "Paste Text" tab**
5. **Paste this sample text:**
   ```
   JavaScript is a high-level, interpreted programming language. It is a language which is also characterized as dynamic, weakly typed, prototype-based and multi-paradigm. JavaScript was originally developed by Brendan Eich of Netscape under the name Mocha, which was later renamed to LiveScript, and finally to JavaScript.
   ```
6. **Select "Software Engineer"** category
7. **Set count to 5**
8. **Click "Generate Flashcards"**
9. **Wait for generation** (should take 10-30 seconds)
10. **Review flashcards** in preview
11. **Click "Save Selected Flashcards"**
12. **Verify flashcards** appear in main list

If all these steps work, the core functionality is working correctly!
