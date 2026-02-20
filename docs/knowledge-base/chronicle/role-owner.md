# Chronicle Knowledge Base — Role: OWNER

_Extracted from knowledgeChronicle.docx_

---

# User Journey: Role OWNER


---


## Login


### Narration

The user interacts with a clean, dual-pane interface where a somber, high-contrast image of a cemetery at dusk reinforces the platform's specific niche in death-care management. Upon reaching the page, the user is presented with a streamlined choice: leverage existing professional identities via Google or Microsoft for speed, or utilize a dedicated Chronicle account for localized security. The interface proactively manages errors by flagging empty required fields in red, ensuring the user corrects their input before attempting to proceed. Once authenticated, the transition from this gateway to the core application allows cemetery administrators to move from security protocols to active site management.

### Mermaid Chart


### User Journey Table


| Stage | User Action | System Response |
| --- | --- | --- |
| Selection | User chooses an authentication method (Social, SSO, or Email). | Highlights the selected field or redirects to a third-party provider. |
| Input | User enters their email address and password. | Validates data format in real-time (e.g., showing "This is a required field"). |
| Preference | User toggles "Remember me" for future sessions. | Stores a session cookie to bypass login on the next visit. |
| Execution | User clicks the "LOGIN" button. | Authenticates credentials and grants access to the dashboard. |
| Recovery | User clicks "Forgot password?" or "Sign up for free." | Redirects to password reset flow or organization registration page. |


---


## Dashboard-Map


### Narration

The owner accesses the 'Astana Tegal Gundul' dashboard, immersing themselves in a sophisticated, dual-pane interface designed to bridge the gap between administrative data and geospatial reality. Upon loading the organization view, the owner is greeted by a split-screen layout: the left pane serves as a command center for vital statistics, offering an immediate, quantitative pulse of the cemetery through high-level metrics like 'Total Plots,' 'Occupied' status, and 'Interment' breakdowns. Conversely, the right pane anchors these numbers in physical space, presenting an interactive satellite map overlayed with precise lot sections and boundaries. This cohesive design allows the administrator to fluidly shift their cognitive focus from analyzing capacity data to visualizing specific plot locations, enabling informed decision-making regarding plot sales, maintenance, and spatial planning without ever leaving the central hub.

### Mermaid Chart


### User Journey Table


| User Stage | Action | System Interface / Response | User Goal |
| --- | --- | --- | --- |
| Orientation | User lands on the main dashboard for "Astana Tegal Gundul." | Displays Organization Header, Tab navigation (Administration/Public), and Sidebar menu. | Establish context and verify the correct organization is loaded. |
| Data Assessment | User scans the left panel statistics cards. | Shows concise metrics: Total Plots (187), Occupied (20), Vacant (145), and Total Interments (22). | Quickly assess inventory levels and current cemetery capacity. |
| Spatial Correlation | User interacts with the map on the right (Pan/Zoom). | The satellite map updates; vector overlays for "Section LOT A1" and "LOT A2" become visible. | Match the inventory numbers to specific physical locations on the ground. |
| Drill-Down | User clicks "See All Plots" or a specific status card (e.g., "Vacant"). | The system filters the list or highlights specific plots on the map (implied functionality). | Investigate specific available inventory for a potential sale or reservation. |
| Management | User identifies a need to update a section and looks for action buttons. | "ADD ROI" (Region of Interest) prompts are visible; Sidebar offers "Requests" and "Sales" modules. | Initiate an administrative task, such as defining a new plot area or processing a burial request. |


---


## Dashboard-Tables


### Narration

Upon logging in, they navigate to the Tables view to perform a high-level audit of plot inventory. They are met with a dense, data-rich interface that allows them to see the lifecycle of burial plots from vacant land to occupied memorials. The owner can quickly scan for "Vacant" statuses to identify available inventory for sale, check "Reserved" plots for pending transactions, or review "Occupied" plots for maintenance and interment records. The interface serves as the "source of truth" for the physical grounds, translating a geographical cemetery into a searchable, manageable digital ledger.

### Mermaid Chart


### User Journey Table


| Phase | User Action | System Response | Intent/Goal |
| --- | --- | --- | --- |
| Access | Clicks on the Tables icon in the left sidebar. | Displays the "Plots" master list with 188 records. | Get a bird's-eye view of all cemetery assets. |
| Filter/Search | Uses the Filter button or scrolls to find specific Sections (e.g., Section B). | Narrows down the list to specific rows or plot types (Lawn vs. Monumental). | Find a specific plot for a customer or update. |
| Inventory Audit | Scans the Status column (Occupied, Reserved, Vacant). | Color-coded badges provide immediate visual status updates. | Identify which plots are available for immediate sale. |
| Detail Review | Reviews Burial/Cremation Capacity and Price. | Shows capacity (e.g., "1" or "100") and pricing (e.g., "$50,000.00"). | Ensure the plot meets the physical and financial needs of a client. |
| Action/Edit | Selects a Plot ID (e.g., "BG 10") or clicks + Add Plot. | Opens a detailed record or a new entry form. | Update records or expand the cemetery database. |
| Reporting | Clicks the Export button. | Generates a downloadable file of the current table view. | Share data with stakeholders or keep an offline backup. |


---


## Dashboard-Calendar


### Narration

The owner is navigating the Calendar interface to manage operational tasks and scheduling for "Astana Tegal Gundul". The screen shows a focused workspace where an administrator can track upcoming interments, maintenance, or administrative deadlines.

### Mermaid Chart


### User Journey Table


| Phase | User Action | System Response | Intent/Goal |
| --- | --- | --- | --- |
| Navigation | Clicks the Calendar icon in the sidebar. | Loads the monthly calendar grid and task panel. | Access the site's schedule and timeline. |
| Filtering | Selects "Priority Tasks," a specific "Responsible Person," and "Open" status. | Filters the view to show only relevant, incomplete high-priority items. | Narrow down the workload to focus on urgent assignments. |
| Assessment | Reviews the calendar grid and the "No events to display" message. | Confirms there are no scheduled tasks meeting the filter criteria. | Verify staff availability or check for scheduling gaps. |
| Creation | Clicks the + ADD NEW EVENT button. | Likely opens a modal to input event details (date, time, task type). | Schedule a new burial, meeting, or maintenance task. |


---


## Dashboard-Request


### Narration

The owner is navigating the Request module of the Chronicle platform for the "Astana Tegal Gundul" organization. This interface acts as a workflow management hub where staff process applications for plot purchases, categorized into "At-need" (immediate) or "Pre-need" (future planning).

### Mermaid Chart


### User Journey Table


| Phase | User Action | System Response | Intent/Goal |
| --- | --- | --- | --- |
| Review | Clicks the Request icon in the sidebar. | Displays a table of all purchase requests. | Audit the current queue of pending sales. |
| Categorize | Scans the Sub-type and Date & time columns. | Shows whether the request is "At-need" or "Pre-need" and when it arrived. | Prioritize urgent "At-need" requests for immediate burials. |
| Validate | Checks the Plot ID column. | Shows if a specific plot has been selected for the request. | Ensure the physical inventory matches the digital application. |
| Approve | Updates the Status from "Open" to "Approved". | Changes the status badge color to green. | Finalize the sale and move the request to the next stage. |
| Monitor | Reviews the Events column. | Indicates if calendar events (like interments) are linked to the request. | Ensure scheduling is synchronized with the purchase. |


---


## Dashboard-Sales


### Narration

The owner is navigating the Sales module for "Astana Tegal Gundul" to manage the financial lifecycle of cemetery plot transactions. This interface acts as a digital ledger where administrators track invoices (Sale IDs), monitor payment statuses ranging from "Paid" and "Partially Paid" to "Overdue".

### Mermaid Chart


### User Journey Table


| Phase | User Action | System Response | Intent/Goal |
| --- | --- | --- | --- |
| Access | Clicks the Sales icon in the sidebar. | Displays the master sales table with invoice details. | Review the financial health of the organization. |
| Audit Status | Scans the Status column for "Overdue" or "Unpaid" tags. | Highlights accounts requiring immediate follow-up. | Identify revenue leakage or late payments. |
| Verify Plots | Checks the Related Plot(s) column. | Shows which physical locations (e.g., B F 1, B F 3) are tied to an invoice. | Confirm that the correct land is being billed. |
| Reconcile | Compares the Price vs. Paid columns. | Shows the remaining balance for partially paid items. | Update financial records after receiving a payment. |
| Create | Clicks the + CREATE SALE button. | Opens a new invoice generation form. | Initiate a new transaction for a recent plot request. |


---


## Report


### Narration

The owner is navigating the Reports module for the "Astana Tegal Gundul" organization, which serves as the data intelligence hub of the Chronicle platform. This interface allows administrators to generate specialized documents ranging from inventory and interment records to financial "Business" summaries and "User Logs" for auditing actions. While the "Recent reports" section is currently empty, the owner has access to a variety of pre-defined reporting categories to analyze cemetery operations, plot statuses, and the people associated with the site.

### Mermaid Chart


### User Journey Table


| Phase | User Action | System Response | Intent/Goal |
| --- | --- | --- | --- |
| Access | Clicks the Reports icon in the sidebar. | Displays the "Create report" menu and favorites. | Access data analysis tools. |
| Select Category | Chooses a report type like Inventory or Interments. | Prepares the parameters for the specific data set. | Narrow down the scope of the data needed. |
| Use Favorites | Clicks on a saved report like "Eksa-Inv-Sections". | Quickly loads a frequently used report configuration. | Save time on recurring reporting tasks. |
| Generate | Clicks the CREATE REPORT button. | Processes the request to generate a new document. | Produce a fresh data export for review. |
| Review | Checks the Recent reports panel. | Shows a history of recently generated files for download. | Retrieve and share the completed report. |


---


## My Organization-General


### Narration

The owner is accessing the Organization Configuration for "Astana Tegal Gundul" to manage the foundational settings and administrative identity of the cemetery. This specialized dashboard allows the administrator to oversee core business details—such as the organization's public URL, contact information, and business address, while monitoring technical status like the active "PRO" subscription and 79 available credits. It acts as the back-end control center where security features like multi-factor authentication are toggled and payment gateways are configured to ensure the platform operates smoothly for daily cemetery management tasks.

### Mermaid Chart


### User Journey Table


| Phase | User Action | System Response | Intent/Goal |
| --- | --- | --- | --- |
| Access | Clicks the settings or organization profile icon. | Displays "Organisation Configuration" with a sidebar of categories (General, Access, Sales, etc.). | Review or update global administrative settings. |
| Identity Audit | Reviews "Public URLs" and contact details. | Shows the live staging link and primary phone/email contacts. | Ensure the public-facing information and internal contact points are correct. |
| Security Check | Checks status of Multi-factor authentication and SSO/SAML. | Displays both features as currently "Off". | Evaluate the current security posture of the administrative account. |
| Financial Setup | Verifies "Payment Gateway" and "Subscription plan". | Shows the gateway as "Configured" and the plan as "PRO". | Confirm the account is ready to process sales and has active features. |
| Update | Clicks the EDIT ORGANISATION DETAILS button. | Likely opens a form to modify address, business numbers, or contact info. | Refresh outdated business information or change administrative leads. |


---


## My Organization-Cemeteries


### Narration

The owner is navigating the Edit Cemetery configuration for "Astana Tegal Gundul" to manage its public profile and geospatial data. This screen serves as the primary setup for how the cemetery appears to the public, allowing administrators to define the site's boundaries via an interactive map, set working hours, and upload representative photos. By detailing the exact latitude and longitude, the user ensures that the "Public" status of the cemetery correctly reflects its physical location in Bali, Indonesia, while providing essential contact information like phone numbers and web links for external visitors.

### Mermaid Chart


### User Journey Table


| Phase | User Action | System Response | Intent/Goal |
| --- | --- | --- | --- |
| Access | Navigates to the Cemeteries tab under Organization Configuration and selects the site. | Loads the "Edit Cemetery" dashboard with current metadata. | Modify specific cemetery attributes. |
| Geolocation | Adjusts the Cemetery position by drawing bounds on the satellite map. | Updates Latitude and Longitude coordinates (e.g., -8.656944, 115.144798). | Accurately map the physical cemetery footprint for digital use. |
| Information Update | Edits working hours, contact emails, and the "Cemetery description" text box. | Validates input against required fields like Cemetery title and URL. | Provide clear operational details for visitors and staff. |
| Visual Management | Uploads or reorders site Photos and verifies the Ortho image tiles link. | Displays thumbnails of the uploaded images for confirmation. | Enhance the visual appeal and documentation of the cemetery profile. |
| Finalize | Review status as "Public" and clicks the SAVE button. | Commits changes to the live staging environment. | Publish updates to the cemetery’s public-facing digital record. |


---


## My Organization-Access


### Narration

The owner is managing Access permissions for the "Astana Tegal Gundul" organization to ensure secure team collaboration. This interface allows an administrator to oversee a diverse roster of users with varying roles, such as "Owner," "Admin," "Manager," and "Viewer," while tracking their activity through "Added" and "Last Login" dates. By filtering through statuses like "Active," "Pending," or "Archived," the owner can maintain an up-to-date staff list, revoking access for former employees or onboarding new team members like to ensure the right people have appropriate oversight of the cemetery's operations.

### Mermaid Chart


### User Journey Table


| Phase | User Action | System Response | Intent/Goal |
| --- | --- | --- | --- |
| Review | Clicks the Access tab in the sidebar. | Displays a master list of all users and their assigned roles. | Audit who currently has permission to the system. |
| Filter | Uses top tabs to toggle between Active, Pending, or Archived. | Narrows the list to show only relevant user categories. | Focus on current staff or review past access history. |
| Verify Activity | Scans the Last Login column. | Shows when each user last accessed the platform. | Identify inactive accounts or monitor staff engagement. |
| Role Check | Reviews the Role and Cemetery scope. | Confirms if a user is an "Admin" or "Viewer" for "All Cemeteries". | Ensure personnel have the correct level of authority. |
| Onboard | Clicks the + ADD ACCESS button. | Likely opens a form to invite a new user via email and role selection. | Expand the team and delegate management tasks. |


---


## My Organization-Custom Field


### Narration

The owner is navigating the Custom Fields configuration for "Astana Tegal Gundul" to tailor the database specifically for unique cemetery data needs. This interface allows administrators to go beyond standard fields by creating specialized data points for Plots, Interments, or ROI (Right of Interment), such as "Plaque details," "Vault Status," or "Exhumed" notes. By defining field types—ranging from simple text and dates to selectable dropdowns—and setting visibility to either Public for visitors or Internal for staff only, the user ensures that the platform captures the precise technical and historical nuances required for accurate cemetery record-keeping.

### Mermaid Chart


### User Journey Table


| Phase | User Action | System Response | Intent/Goal |
| --- | --- | --- | --- |
| 1. Access | Clicks the Custom Fields tab in the organization sidebar. | Displays a list of existing custom fields categorized by data type. | Review current specialized data points. |
| 2. Categorize | Toggles between the Plots, Interments, and ROI tabs. | Switches the list to show fields relevant to that specific category. | Organize custom data according to its purpose (e.g., plot vs. person). |
| 3. Privacy Audit | Scans the Visibility column for "Public" vs. "Internal" tags. | Identifies which data is visible to the public and which is restricted to staff. | Ensure sensitive information like "Vault Status" remains internal. |
| 4. Structural Review | Checks the Type column (Text, Text Area, Select, Date). | Shows how data must be entered for each field. | Maintain data integrity by enforcing specific input formats. |
| 5. Expand | Clicks the + ADD CUSTOM FIELD button. | Opens a configuration tool to name and define a new data point. | Capture new types of information as operational needs evolve. |


---


## My Organization-Custom Sales


### Narration

The owner is accessing the Sales Configuration area within the Organization settings to define the catalog of products and services available for purchase at "Astana Tegal Gundul". This backend interface allows administrators to create standardized line items complete with detailed descriptions and specific categories. By managing this master list, the user ensures that when staff create new sales invoices in the field, they are selecting from a pre-approved, consistent inventory that integrates directly with the organization's financial reporting and automated billing workflows.

### Mermaid Chart


### User Journey Table


| Phase | User Action | System Response | Intent/Goal |
| --- | --- | --- | --- |
| Access | Clicks the Sales tab in the organization sidebar. | Displays the "Items" management table. | Manage the product catalog. |
| Inventory Audit | Reviews existing entries like "item f". | Shows price ($50.00), category, and descriptive text. | Verify current pricing and service details. |
| Categorization | Toggles between Items, Categories, and Settings. | Refines the view to focus on specific financial structures. | Organize products for easier staff navigation. |
| Expansion | Clicks the + CREATE ITEM button. | Opens a configuration form for a new service or product. | Add new offerings to the cemetery's sales list. |
| Scope Check | Verifies the "Cemetery" column (e.g., "All Cemeteries"). | Confirms which sites can sell this specific item. | Ensure regional pricing or item availability is correct. |


---


## My Organization-Event type


### Narration

The owner is navigating the Event Types configuration for "Astana Tegal Gundul" to standardize operational workflows across the cemetery. This control panel allows administrators to define a comprehensive list of activities—ranging from "Funeral Service" and "Burial" to "Maintenance" and "Flower Delivery"—ensuring consistent data entry for the team. By drilling down into specific types like "Funeral Service," the owner can manage detailed sub-types such as "Cortege" or "Graveside" and assign logical progression statuses like "Confirmed," "Requested," and "Unconfirmed," effectively building a structured roadmap for every event scheduled on the cemetery calendar.

### Mermaid Chart


### User Journey Table


| Phase | User Action | System Response | Intent/Goal |
| --- | --- | --- | --- |
| Access | Clicks the Event Type tab in the organization sidebar. | Displays a master list of all current operational event categories. | Review the existing service and task catalog. |
| Categorize | Selects a specific event, such as Funeral Service. | Opens a detailed view showing associated sub-types and statuses. | Define the granular details of a major service type. |
| Refine | Reviews or adds Sub-types like "Cortege" or "Graveside". | Updates the options available to staff when they create new calendar events. | Ensure all variations of a service are captured accurately. |
| Workflow Mapping | Manages Status options (e.g., Requested, Confirmed). | Defines the lifecycle stages for that specific event type. | Track the progress of services from initial inquiry to completion. |
| Expand | Clicks the + ADD TYPE button. | Opens a configuration modal to create a brand new category like "Dig Grave" or "Cremation". | Adapt the system to include new services or administrative tasks. |


---


## My Organization-Business type


### Narration

The owner is navigating the Business Types configuration for "Astana Tegal Gundul" to categorize the external partners and service providers that interact with the cemetery's operations. This administrative dashboard allows the owner to maintain a standardized list of industry-specific roles—such as "Funeral Home," "Florist," and "Landscape Design"—which can then be linked to specific business records in the system. By defining these types, the administrator ensures that the "Business" reports and contact directories are well-organized, making it easy to filter and manage relationships with essential vendors like excavators or delivery services.

### Mermaid Chart


### User Journey Table


| Phase | User Action | System Response | Intent/Goal |
| --- | --- | --- | --- |
| Access | Clicks the Business Types tab in the organization sidebar. | Displays a master list of all current business categories. | Review the classification system for external vendors. |
| Inventory Audit | Scans existing categories like "Funeral Home," "Florist," and "Excavator". | Shows a vertical list of types used to tag business contacts. | Verify that all necessary service sectors are represented. |
| Management | Reviews the order or presence of specialized types like "Landscape Design". | Provides a drag-handle for reordering or an 'X' for removal. | Keep the vendor classification list tidy and relevant. |
| Creation | Clicks the + ADD TYPE button. | Likely opens a simple text input to name a new category. | Add a new niche, such as "Monumental Mason" or "Caterer". |
| Implementation | Saves the new list for use across the platform. | Updates the dropdown options available in the "Business" module. | Enable staff to correctly tag new partner companies. |


---


## My Organization-Regional Settings


### Narration

The owner is navigating the Regional Settings configuration for "Astana Tegal Gundul" to localize the platform's terminology and specific classifications to match Indonesian or site-specific standards. This interface acts as a linguistic and structural control center where an administrator can customize the labels for physical and legal assets changing standard terms like "Returned Service person" to "Vetaranxx" or "Navy" to "Navyyy"—while also defining the local date format (DD/MM/YYYY) and the available "Term of right" periods for interments. By fine-tuning these settings, the owner ensures that the entire system, from the map to the official certificates, reflects the specific cultural and administrative vocabulary of the Bali-based organization.

### Mermaid Chart


### User Journey Table


| Phase | User Action | System Response | Intent/Goal |
| --- | --- | --- | --- |
| 1. Access | Clicks the Regional Settings tab in the organization sidebar. | Displays naming conventions and notable person labels. | Audit the current localization and terminology. |
| 2. Terminology Edit | Updates singular and plural labels for Cemetery, Section, or Plot. | Standardizes how these physical locations are referenced site-wide. | Align digital labels with local physical signage. |
| 3. Notable Persons | Modifies keys/labels for special classifications (e.g., "Navyyy", "Artistt"). | Updates the iconography and tags available for person records. | Customize cultural or professional recognition categories. |
| 4. Date/Legal Setup | Sets the Date format and toggles Term of right durations (e.g., 25 Years). | Enforces data entry standards and defines legal lease lengths. | Ensure compliance with regional administrative standards. |
| 5. Map Behavior | Toggles "Keep sections on at high zoom by default". | Adjusts how geographical data is rendered on the main map view. | Optimize the visual experience for high-density site maps. |


---


## My Organization-Certificates


### Narration

The owner is navigating the Certificates configuration for "Astana Tegal Gundul" to manage the official document templates generated by the platform. This interface acts as a digital printing house where administrators organize standardized forms and legal deeds into categories like ROI (Right of Interment), Plots, Interments, and Events. By creating or editing templates such as "Burial order," "ROI/Deed Certificate," or specialized "Test Templates," the owner ensures that every legal transaction and operational activity produces a professional, consistent document that can be issued to families or used for internal record-keeping.

### Mermaid Chart


### User Journey Table


| Phase | User Action | System Response | Intent/Goal |
| --- | --- | --- | --- |
| Access | Clicks the Certificates tab in the organization sidebar. | Displays categorized lists of all current document templates. | Review the library of official forms and deeds. |
| Categorization | Scans sections for ROI, Plots, Interments, and Events. | Groups templates by their functional purpose in the cemetery lifecycle. | Locate a specific type of legal or operational document. |
| Template Audit | Reviews specific form names like "Application for grant of ROI" or "Burial order". | Shows which documents are ready for use or require editing. | Ensure all required legal paperwork is correctly formatted. |
| Maintenance | Clicks the Edit icon or X (delete) icon next to a template. | Opens the template editor or removes an obsolete form. | Update the language or layout of existing certificates. |
| Creation | Enters a name in the Form name field and clicks CREATE TEMPLATE. | Generates a new blank template within the selected category. | Add a new specialized document, such as a "Test Template ROI". |


---


## My Organization-Forms


### Narration

The owner is navigating the Forms configuration for "Astana Tegal Gundul" to manage the digital touchpoints between the cemetery and its stakeholders, including public users and funeral directors. This dashboard serves as a portal for creating and organizing standardized intake forms—such as "Pre-need plot purchase," "Dig a Grave," and "Feedback"—that are triggered by specific plot conditions like "FOR SALE" or "RESERVED". By tailoring these forms for specific audiences (e.g., Public Users vs. Cemetery Internal), the administrator ensures that service requests are gathered efficiently, whether they are initiated from the interactive map or a dedicated administrative burial order.

### Mermaid Chart


### User Journey Table


| Phase | User Action | System Response | Intent/Goal |
| --- | --- | --- | --- |
| Access | Clicks the Forms tab in the organization sidebar. | Displays a master list of all current intake forms and their display logic. | Review the current data collection points for the site. |
| Logic Audit | Scans the Condition and Display on columns. | Shows where forms appear (e.g., on a specific "Plot") and when (e.g., when it's "FOR SALE"). | Ensure forms are only visible during relevant stages of the plot lifecycle. |
| Audience Check | Reviews the Display For column. | Distinguishes between "Public Users" and "Cemetery Internal" access. | Verify that sensitive operational forms (like "Dig Grave") are not public-facing. |
| Functional Setup | Checks the Request Type for specific titles. | Links forms to core actions like "Purchase Plot" or "General Works". | Align data collection with back-end workflow processes. |
| Expansion | Clicks the + CREATE FORM button. | Likely opens a builder to design a new specialized intake form. | Add new points of interaction, such as a "Monument Repair" request. |


---


## My Profile


### Narration

The owner is viewing the My Profile section of the Chronicle platform to manage their personal account identity and security settings. This dashboard provides a central location for the user, to update their contact information, manage authentication methods such as Google or Facebook, and review their specific access roles within the Astana Tegal Gundul organization. It serves as a personal command center, ensuring the user has the correct credentials and verified social logins to maintain secure, uninterrupted access to the cemetery management system.

### Mermaid Chart


### User Journey Table


| Phase | User Action | System Response | Intent/Goal |
| --- | --- | --- | --- |
| Access | Clicks on the user profile or account settings icon. | Displays the "My Profile" page with personal details and access logs. | Review personal account status. |
| Edit Identity | Clicks the EDIT button in the profile card. | Opens fields to modify name or mobile phone number. | Keep contact information current. |
| Security Update | Clicks Change next to the Password field. | Initiates the password reset or update workflow. | Maintain account security and privacy. |
| Link Accounts | Clicks Add next to Google, Facebook, or Microsoft. | Redirects to the chosen provider for OAuth authentication. | Enable easier, multi-method login options. |
| Access Audit | Reviews the Access table on the right. | Shows the role ("ORGANIZATION") and last login date (Feb 4, 2026). | Verify permissions and recent account activity. |


---

