# Bug Fix: Case Study Viewer Scrolling Issue

## Issue Reported
User reported: "When I click on the question I am not able to scroll through the questions to see the rest."

## Root Cause
The case study viewer modal had `max-height: 70vh` but the modal content structure wasn't properly configured for scrolling. The modal body needed explicit overflow handling.

## Solution Applied

### Changes Made to `css/case-study.css`:

```css
/* Case Study Viewer */
.case-study-viewer {
    max-height: 70vh;
    overflow-y: auto;
    overflow-x: hidden;
    padding-right: 10px;  /* Added for scrollbar spacing */
}

/* NEW: Ensure modal content is scrollable */
#caseStudyViewerModal .modal-content {
    max-height: 85vh;
    overflow: hidden;
    display: flex;
    flex-direction: column;
}

#caseStudyViewerModal .modal-body {
    overflow-y: auto;      /* Enable vertical scrolling */
    overflow-x: hidden;    /* Prevent horizontal scrolling */
    flex: 1;               /* Take available space */
    padding: 25px;
}
```

## What This Fixes

1. **Modal Content Structure**: Set modal-content to flexbox with max-height
2. **Scrollable Body**: Made modal-body scrollable with proper overflow
3. **Smooth Scrolling**: Added padding-right to prevent content jump
4. **Responsive Height**: Modal adapts to 85vh max height

## Testing

✅ **Verified**: User tested and confirmed the fix works
- Can now scroll through all questions
- Follow-up questions are accessible
- No horizontal scrolling issues
- Smooth scrolling experience

## Impact

- **Files Modified**: 1 (css/case-study.css)
- **Lines Added**: 12
- **Breaking Changes**: None
- **Browser Compatibility**: All modern browsers

## Status

🟢 **RESOLVED** - Issue fixed and tested by user
