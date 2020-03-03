# PCF - GridCard
 A PCF control to render a grid (built specifically for single record grids) as a traditional list of fields in a section

## Overview
CDS does not have a native 1:1 realtionship. As a workaround, you generally have to use a 1:many relationship and live with a grid on the form. This PCF renders a grid of one record as a more traditional looking list of fields within a section giving it a more native look.

From a user's perspective, they can clearly see the information they need without the need of the additional grid elements that muddy the user experience.

## Features/Considerations
- The control uses the columns in a standard view to display them as traditional fields in a section.
- The control is best used on an entity form sub-grid.
- You need to set the filters on your view to ensure that only a single record is returned. If you dont, RTFM.
- You can select the title of the card by specifying the logical name of the target field. The field must be in view.

## Configuration
Use the following steps to configure a Grid Card against a view after installing the solution

1. Select the associated view you want to use and add the desired columns to a view.
2. Update the view filter to ensure that only a single record is returned.
3. Click the 'Custom Control' button to add the control
4. Select the 'Grid Card' control
5. Control parameters (Screenshot below):
- a. Primary Field - The logical name of the primary field to be used as the title for the the Grid Card. This also acts as the link to the related record


## CDS Solution
For convienence, the Releases folder contains a managed solution that can be installed on CDS.
