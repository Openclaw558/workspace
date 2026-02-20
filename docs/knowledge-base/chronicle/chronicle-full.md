# Chronicle — Complete Knowledge Base

_Digital Cemetery Management Platform — All User Journeys_

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

# User Journey: Role ADMIN


---


## Dashboard - Map


### Narration

Upon logging into the dashboard cemetery management portal, Admin is greeted with a split-screen interface that bridges data analytics with geospatial mapping. The left sidebar serves as a command center, providing a high-level summary of the site's plots, including a breakdown of vacancies and pending approvals. Simultaneously, the interactive satellite map on the right allows the user to visually verify plot locations, such as "LOT A1," ensuring that digital records match the physical landscape. This dashboard allows Admin to review interment statistics and perform technical mapping tasks, such as adding new Regions of Interest (ROI) directly onto the cemetery grounds.

### Mermaid Chart


### User Journey Table


| Stage | User Action | System Response |
| --- | --- | --- |
| Overview | User views the "Administration" tab for plot statistics. | Displays real-time counts for occupied, vacant, and reserved plots. |
| Navigation | User interacts with the satellite map on the right pane. | Syncs map view with specific plot data or "LOT" sections. |
| Audit | User checks "Total Interments" (e.g., Burials vs. Cremations). | Filters dashboard cards to show specific burial types. |
| Spatial Edit | User selects "ADD ROI" at the bottom of the screen. | Activates mapping tools to define new regions of interest on the satellite view. |
| Deep Dive | User clicks "SEE ALL PLOTS." | Redirects to a tabular list for granular data management. |


---


## Dashboard - Tables


### Narration

Upon navigating to the Tables section of the cemetery management portal, the Admin is presented with a comprehensive data grid that prioritises granular record-keeping over geospatial visualisation. This command center allows for the meticulous tracking of 188 plots, offering a clear breakdown of specific attributes like Plot ID, burial capacity, and pricing. While the dashboard provides a high-level summary, this interface enables the Admin to perform deep-dive audits, such as verifying the "Occupied" status of monumental plots or identifying available "Lawn" sections. This tabular environment ensures that every digital record from headstone inscriptions to cremation capacities is accurately maintained and easily exportable for organisational reporting.

### Mermaid Chart


### User Journey Table


| Stage | User Action | System Response |
| --- | --- | --- |
| Navigation | User clicks the "Tables" icon in the left sidebar. | Switches view from the map to a comprehensive data grid of all plots. |
| Data Review | User scans columns for Plot ID, Status (Occupied, Vacant, Reserved), and Price. | Displays categorized data for 188 plots with real-time status indicators. |
| Filtering | User selects the "FILTER" button to isolate specific sections or plot types. | Narrows the list to show only relevant entries, such as "Monumental" or "Lawn" plots. |
| Expansion | User clicks on "ADD PLOT" or switches tabs to "INTERMENTS" or "ROIS". | Opens a creation modal or refreshes the table with specialized data sets. |
| Export | User clicks the "EXPORT" button. | Generates a downloadable file of the current table view for external reporting. |


---


## Dashboard - Calendar


### Narration

Upon navigating to the Calendar section of the cemetery management portal, the Admin is greeted with a clean, grid-based scheduling interface designed for efficient time management. The left sidebar serves as a specialized filtering panel, allowing the Admin to sort through "Priority Tasks" and track responsibilities assigned to specific team members like "endri admin." While the main grid currently shows "No events to display," it acts as a central canvas for the site's operational timeline. This view allows the Admin to plan future interments, manage maintenance schedules, and ensure that all "Open" tasks are visually mapped out across the month, preventing scheduling conflicts within the cemetery grounds.

### Mermaid Chart


### User Journey Table


| Stage | User Action | System Response |
| --- | --- | --- |
| Navigation | User clicks the "Calendar" icon in the left sidebar. | Opens the monthly calendar view, defaulting to the current month (February 2026). |
| Filter Tasks | User applies filters for "Priority Tasks" and "Responsible Person." | Refines the sidebar view to show only tasks assigned to specific admins (e.g., "endri admin"). |
| Status Check | User toggles the "Completion Status" to "Open." | Displays pending events or tasks on the calendar grid. |
| Event Creation | User clicks the "+ ADD NEW EVENT" button in the bottom left. | Launches a modal to input event details, dates, and assignees. |
| Time Navigation | User uses the arrows or "Today" button. | Shifts the calendar grid view between different months or resets to the current date. |


---


## Dashboard - Requests


### Narration

Upon navigating to the Requests section of the cemetery management portal, the Admin is presented with a high-volume transactional ledger that manages the lifecycle of plot acquisitions. This interface serves as a critical checkpoint, displaying a real-time list of 48 pending or processed applications, each categorised by urgency ranging from "Pre-need" planning to immediate "At-need" requirements. The Admin can quickly discern the status of various applicants and track the journey of specific plots like "B A 7" from an initial "OPEN" request to an "APPROVED" sale. This streamlined workflow ensures that every burial plot application is documented, dated, and systematically processed to maintain the integrity of the cemetery’s sales and occupancy records.

### Mermaid Chart


### User Journey Table


| Stage | User Action | System Response |
| --- | --- | --- |
| Navigation | User clicks the "Request" icon with the notification badge (48). | Opens the full list of purchase requests, sorted by date and time. |
| Review | User scans the list for applicant names and purchase types (At-need vs. Pre-need). | Displays a color-coded status for each entry, such as "OPEN" (purple) or "APPROVED" (green). |
| Identification | User identifies specific Plot IDs (e.g., "B A 2") associated with a request. | Links the request directly to the inventory database for verification. |
| Filtering | User clicks the "FILTER" icon in the top right. | Provides options to sort requests by status, applicant, or specific date ranges. |
| Action | User selects an individual request to view associated events or move it toward approval. | Updates the "Events" column or changes the status upon administrative action. |


---


## Dashboard - Sales


### Narration

Upon navigating to the Sales section of the cemetery management portal, the Admin is greeted with a robust financial dashboard that bridges the gap between plot inventory and revenue management. This interface acts as a centralised ledger where every transaction is meticulously recorded, from high-value bulk purchases to individual memorial fees. The Admin can instantly gauge the financial status of the organisation by reviewing the color-coded status badges, allowing them to prioritise follow-ups on "OVERDUE" accounts or finalize "DRAFT" invoices. By linking each Sale ID directly to specific plots and owners, the system ensures a transparent and auditable trail of ownership and payment history, facilitating seamless financial oversight of the Astana Tegal Gundul grounds.

### Mermaid Chart


### User Journey Table


| Stage | User Action | System Response |
| --- | --- | --- |
| Navigation | User clicks the "Sales" icon in the left sidebar. | Displays a comprehensive list of invoices with unique Sale IDs (e.g., INV-00000451). |
| Status Audit | User scans the "Status" column for payment health. | Visually differentiates between "UNPAID," "PAID," "PARTIALLY PAID," and "OVERDUE" using color-coded badges. |
| Linkage Check | User verifies the "Related Plot(s)" column. | Connects financial records to physical inventory, such as linking a $1,940 sale to multiple plots (B F 1, B F 2, etc.). |
| Reconciliation | User compares "Price" vs. "Paid" columns for a specific purchaser. | Shows real-time balance tracking, such as a $55.00 total with $20.00 paid. |
| New Transaction | User clicks the "+ CREATE SALE" button. | Opens a billing interface to generate a new invoice and assign an owner. |


---


## Dashboard - Reports


### Narration

Upon navigating to the Reports section of the cemetery management portal, the Admin is greeted with a structured, three-column interface designed to streamline the data extraction process. The left "Create report" column serves as the primary menu, offering specialized categories ranging from Inventory and Interments to financial Business summaries and administrative User Logs. By selecting one of these options, the Admin is transitioned to a dedicated creation page to refine the report's scope. Simultaneously, the "Recent reports" column provides immediate access to previously generated files, such as the Astana Tegal Gundul - A and B inventory summaries, ensuring that frequently used data is always within reach for organizational reporting and audit readiness.

### Mermaid Chart


### User Journey Table


| Stage | User Action | System Response |
| --- | --- | --- |
| Navigation | Admin clicks the Reports icon in the sidebar. | Loads the reporting dashboard with category columns. |
| Selection | Admin chooses a report type (e.g., Inventory, Business, or User Log). | Prepares the system to redirect to a specific configuration page. |
| Review | Admin checks the Recent Reports column for existing files. | Displays a list of recently generated XLSX summaries from the current date. |
| Customization | Admin selects a specific report, such as Inventory Summary. | Navigates the user to a secondary page to set parameters like date ranges or plot sections. |
| Action | Admin clicks on a recent report or marks one as a Favorite. | Triggers a download or saves the report for quick access in the middle pane. |


---


## Profile Dropdown - My Organisation


---


## General


### Narration

Upon accessing the Organisation Configuration from the profile dropdown, the Admin is greeted with a centralized "General" command center that governs the operational identity of Astana Tegal Gundul. This interface allows the Admin to bridge the gap between back-end security and front-facing public access by managing everything from the organization's public URL to critical authentication protocols like SSO and Multi-factor authentication. The page serves as a vital health check for the system, confirming that the payment gateway is correctly configured for sales and that the "PRO" subscription remains active. By providing a clear view of available credits and integrated services like Osiris, this configuration hub ensures the Admin has full oversight and control over the platform's foundational settings.

### Mermaid Chart


### User Journey Table


| Stage | User Action | System Response |
| --- | --- | --- |
| Access | Admin clicks the profile dropdown from the dashboard and selects Organisation Configuration. | Loads the General settings page for "Astana Tegal Gundul." |
| Verification | Admin reviews the Public URL and contact information | Provides a copyable link for public access and displays registered contact details. |
| Security Audit | Admin checks the status of Multi-factor authentication and SSO/SAML. | Shows current security posture (e.g., currently marked as "Off"). |
| System Sync | Admin verifies that the Payment Gateway and Osiris are "Configured" or "On." | Confirms that external integrations are active for processing sales and data. |
| Resource Check | Admin views Available credits (79) and the Subscription plan (PRO). | Displays remaining operational resources and current tier status. |


---


## Cemeteries


### Narration

Upon navigating to the Cemeteries section of the configuration portal, the Admin enters the primary directory for site-specific management. This page acts as a gateway, presenting a clear and searchable inventory of all burial grounds managed by the organization, such as the current entry for Astana Tegal Gundul in Canggu, Bali. The interface is designed for scalability, allowing an Admin to quickly verify address details or search through a growing portfolio of sites. By selecting a specific cemetery from this list, the Admin is moved forward to a dedicated editing environment where they can fine-tune the maps, plot data, and regional settings unique to that physical location.

### Mermaid Chart


### User Journey Table


| Stage | User Action | System Response |
| --- | --- | --- |
| Access | Admin selects the Cemeteries tab from the configuration sidebar. | Displays a searchable list of all cemeteries (currently 1) under the organization. |
| Search | Admin uses the Search bar to find a specific site by name or location. | Filters the list in real-time to show relevant cemetery profiles. |
| Verification | Admin reviews the address and region for Astana Tegal Gundul (Canggu, Bali). | Confirms the physical location and metadata associated with the site entry. |
| Navigation | Admin clicks on the Astana Tegal Gundul list item. | Redirects the Admin to the Edit Cemetery page for deep configuration. |


---


## Access


### Narration

Upon navigating to the Access section of the configuration portal, the Admin is presented with a vital personnel ledger that governs the security of the digital cemetery. This interface acts as the organization's gatekeeper, providing a detailed breakdown of team members, their assigned roles, and their level of engagement across various cemetery sites. The Admin can perform critical oversight tasks, such as monitoring the login frequency of specific staff members or auditing "Archived" accounts to prevent unauthorized access. By utilizing the "+ ADD ACCESS" function, the Admin can seamlessly scale the team, ensuring that new managers or viewers are onboarded with the precise permissions needed to maintain the Astana Tegal Gundul records without compromising system integrity.

### Mermaid Chart


### User Journey Table


| Stage | User Action | System Response |
| --- | --- | --- |
| Access | Admin selects the Access tab from the configuration sidebar. | Loads a comprehensive member list with names, roles, and last login data. |
| Audit | Admin scans the Last Login column for team activity. | Displays timestamps for recent logins (e.g., Feb 3 or Feb 4, 2026). |
| Filtering | Admin toggles between Active, Pending, and Archived filters. | Narrows the view to specific account statuses to identify inactive users. |
| Role Review | Admin verifies the Role assigned to users (e.g., Owner, Admin, Manager, Viewer). | Clearly labels permissions to ensure proper access control. |
| Onboarding | Admin clicks the + ADD ACCESS button. | Opens an invitation modal to grant new users access to specific cemeteries. |


---


## Custom Fields


### Narration

Upon navigating to the Custom Fields section of the configuration portal, the Admin enters a powerful tailoring environment designed to make the platform's data model truly bespoke. This interface acts as a blueprint for the cemetery's specialized records, allowing the Admin to move beyond generic templates by creating unique data categories for plots, interments, and regions of interest. By defining varied field types from simple text areas for plaque inscriptions to specific date pickers for vault charges the Admin ensures that staff can capture every critical detail. The ability to toggle field visibility between "PUBLIC" for visitors and "INTERNAL" for administrative eyes only ensures a perfect balance between transparency and operational privacy for Astana Tegal Gundul.

### Mermaid Chart


### User Journey Table


| Stage | User Action | System Response |
| --- | --- | --- |
| Access | Admin selects the Custom Fields tab from the configuration sidebar. | Loads the management interface, defaulting to the PLOTS sub-tab. |
| Navigation | Admin toggles between PLOTS, INTERMENTS, and ROI tabs. | Switches the context of custom data fields for different database entities. |
| Audit | Admin reviews existing fields like "Plaque details" or "Vault Status." | Displays field types (Text, Date, Select), visibility (Public/Internal), and cemetery linkage. |
| Organization | Admin uses the drag handles (six-dot icon) to reorder fields. | Reorganizes how these fields will appear in the Plot or Interment data entry forms. |
| Creation | Admin clicks the + ADD CUSTOM FIELD button. | Opens a configuration modal to define a new data point, such as "Exhumed" notes or "Temp Plot ID." |


---


## Sales


### Narration

Upon entering the Sales Configuration, the Admin is presented with a streamlined three-part toolkit designed to standardise the organization's financial data. The interface functions primarily as a master catalogue, where the Items and Categories sub-menus allow the Admin to define exactly what services are for sale and how they are classified across the cemetery. While the first two tabs focus on the "what" of the transaction such as pricing and item descriptions the Settings tab shifts focus to the "how," allowing the Admin to manage the fine details of invoice generation. This setup ensures that when a sale is eventually created on the main dashboard, every line item and invoice detail is pulled from this central, pre-configured source.

### Mermaid Chart


### User Journey Table


| Stage | User Action | System Response |
| --- | --- | --- |
| Access | Admin selects the Sales tab from the configuration sidebar. | Loads the product management interface, defaulting to the ITEMS sub-tab. |
| Inventory Audit | Admin reviews the list of current items, such as "item f" priced at $50.00. | Displays item names, assigned categories, and detailed descriptions. |
| Categorization | Admin toggles to the CATEGORIES sub-tab. | Allows for the grouping of items (e.g., "Memorials," "Burial Fees") for better reporting. |
| Site Scoping | Admin checks the Cemetery column for item availability. | Confirms if an item is available for "All Cemeteries" or restricted to a specific site. |
| Catalog Expansion | Admin clicks the + CREATE ITEM button. | Opens a modal to define new services, set fixed pricing, and write standardised descriptions. |


---


## Event Types


### Narration

Upon navigating to the Event Types section of the configuration portal, the Admin enters the control center for the cemetery's operational vocabulary. This interface allows the Admin to move beyond generic scheduling by creating a highly specific hierarchy of activities that staff can choose from when booking the calendar. For instance, a broad "Funeral Service" can be meticulously broken down into "Cortege" or "Graveside" sub-types, each tracked through lifecycle statuses like "Requested" or "Confirmed." By providing a comprehensive list that covers everything from "Flower Delivery" to "Dig Grave," this configuration hub ensures that every action taken on the Astana Tegal Gundul grounds is categorised accurately for both staff coordination and historical reporting.

### Mermaid Chart


### User Journey Table


| Stage | User Action | System Response |
| --- | --- | --- |
| Access | Admin selects the Event Type tab from the configuration sidebar. | Loads the Event Type manager with a list of active categories on the left. |
| Selection | Admin clicks on a specific type, such as Funeral Service. | Displays the detailed configuration card for that event, showing sub-types and statuses. |
| Detailing | Admin clicks + ADD under Sub-types or Status. | Allows the user to define granular options like "Graveside" (sub-type) or "Confirmed" (status). |
| Customization | Admin clicks EDIT or DELETE on an existing Event Type card. | Triggers a modal to update the event name or remove it from the organisation’s list. |
| Expansion | Admin clicks the + ADD TYPE button at the top of the list. | Launches the creation flow to add a brand-new top-level category like "Commemoration." |


---


## Business Type


### Narration

Upon navigating to the Business Types section of the configuration portal, the Admin enters a vital categorization hub that organizes the cemetery's professional ecosystem. This interface allows the Admin to move beyond generic contact lists by creating a specialized taxonomy for every third-party entity involved in the grounds' upkeep and services. By standardizing types such as Excavator, Florist, and Landscape Design, the Admin ensures that when a new business is added to the system, it is tagged with precise functional data. This architectural clarity simplifies vendor management and ensures that operational tasks, from grave digging to floral tributes, are always associated with the correct professional category for Astana Tegal Gundul.

### Mermaid Chart


### User Journey Table


| Stage | User Action | System Response |
| --- | --- | --- |
| Access | Admin selects the Business Types tab from the configuration sidebar. | Loads a managed list of active business categories. |
| Audit | Admin reviews existing types like Funeral Home, Delivery, or Maintenance. | Displays the current classification schema used for external contacts. |
| Organization | Admin uses the drag handles (six-dot icon) to reorder the list. | Adjusts the priority or display order for business type selection menus. |
| Maintenance | Admin clicks the X icon next to a specific type. | Removes the business category from the organization's active options. |
| Expansion | Admin clicks the + ADD TYPE button. | Opens a field to define a new partner category. |


---


## Regional Settings


### Narration

Upon navigating to the Regional Settings section of the configuration portal, the Admin enters the "Translation" hub of the Astana Tegal Gundul ecosystem. This interface allows the Admin to move beyond rigid system defaults by tailoring every label from the high-level "Section" and "Row" to specific cultural markers to fit the local context. By standardising the date format to DD/MM/YYYY and defining the precise legal "Terms of right" (such as 50-year leases), the Admin ensures that all documentation and staff interactions remain consistent and legally compliant. This customisation layer ensures that while the technology is global, the user experience remains deeply rooted in the specific terminology and traditions of the cemetery grounds.

### Mermaid Chart


### User Journey Table


| Stage | User Action | System Response |
| --- | --- | --- |
| Access | Admin selects the Regional Settings tab from the configuration sidebar. | Loads the localization dashboard with editable terminology fields. |
| Terminology Sync | Admin defines singular and plural labels for core entities (e.g., "Cemetery," "Section," "Plot"). | Updates the display labels across the entire application interface. |
| Format Calibration | Admin selects the preferred Date format (e.g., DD/MM/YYYY) from the dropdown. | Standardizes how dates are displayed in the Calendar, Sales, and Requests tabs. |
| Notable Branding | Admin updates keys and labels for Notable Persons | Customizes the badges and search filters used for identifying high-profile interments. |
| Term Regulation | Admin manages the Term of right (e.g., Perpetual, 25 Years) and toggles visibility. | Defines the legal duration of interment rights available during the sales process. |


---


## Certificates

Upon navigating to the Certificates section of the configuration portal, the Admin enters the cemetery's official "printing press," where all legal and administrative documentation is standardised. This interface is meticulously organised into operational buckets such as ROI, Plots, Interments, and Events, ensuring that a "Burial order" is never confused with a "Deed Certificate". By utilising the "Open List of All Variables," the Admin can ensure that every generated document automatically pulls accurate, real-time data from the cemetery's database, such as specific plot locations or applicant names. This centralised control allows the Astana Tegal Gundul organisation to maintain professional, consistent, and legally sound documentation for every stage of the burial and sales lifecycle.

### Mermaid Chart


### User Journey Table


| Stage | User Action | System Response |
| --- | --- | --- |
| Access | Admin selects the Certificates tab from the configuration sidebar. | Loads the document manager, grouped into categories like ROI, Plots, Interments, and Events. |
| Audit | Admin scans existing forms (e.g., "Application for grant of ROI" or "Burial order"). | Displays the active library of legal and administrative templates. |
| Modification | Admin clicks the Edit icon (square with arrow) or Delete (X) on a specific form. | Opens the template editor or prompts to remove the document from the system. |
| Variable Check | Admin clicks Open List of All Variables at the top of the page. | Displays the dynamic data tags (e.g., Plot ID, Deceased Name) available for template mapping. |
| Template Creation | Admin types a new name in the Form name field and clicks CREATE TEMPLATE. | Launches a blank template canvas to design a new custom document for that category. |


---


## Forms


### Narration

Upon reaching the Forms section of the configuration portal, the Admin is focused purely on the creation and refinement of the organisation's digital intake tools. This page acts as a simplified management hub where the primary actions are to either initiate a brand-new form via the "+ CREATE FORM" button or to select an existing entry for editing. Whether setting up a new "Pre-need plot purchase" for public users or updating the internal "Dig a Grave" form, the Admin uses this space to ensure that every interactive element of the Astana Tegal Gundul platform is tailored to the specific needs of the cemetery and its clients.

### Mermaid Chart


### User Journey Table


| Stage | User Action | System Response |
| --- | --- | --- |
| Access | Admin navigates to the Forms tab in the sidebar. | Displays the master list of all existing form titles and their conditions. |
| Selection | Admin identifies a specific form entry to modify. | Highlights the row, showing the current request type and visibility settings. |
| Edit Initiation | Admin selects a form to change its configuration or title. | Opens the edit interface for the specific form template. |
| New Form | Admin clicks the + CREATE FORM button. | Launches a blank form creation tool to start a new intake workflow. |


---


## Profile Dropdown - My Profile


### Narration

Upon navigating to the My Profile section, the user is presented with a clear, two-pane overview of their professional and security standing within the platform. The left column acts as a personal security vault, allowing the user to manage their primary password or broaden their access options by linking social identities like Google or Microsoft for seamless single sign-on. Simultaneously, the right pane provides a transparent view of their operational reach, confirming their specific role as an "ADMIN" for the Astana Tegal Gundul site. This integrated view ensures that users have complete autonomy over their digital identity while maintaining a clear understanding of their responsibilities and recent activity within the cemetery's management system.

### Mermaid Chart


### User Journey Table


| Stage | User Action | System Response |
| --- | --- | --- |
| Access | User clicks their profile name/dropdown and selects My Profile. | Loads the personal profile dashboard showing contact details and access rights. |
| Identity Check | User reviews their registered name and email address. | Displays the primary contact info with an EDIT option for updates. |
| Security Audit | User inspects the Current login method. | Confirms the primary authentication type (e.g., Password) with a "Change" option. |
| Account Linking | User views Available login methods (Google, Facebook, Microsoft). | Provides "Add" buttons to link third-party social accounts for easier SSO access. |
| Role Verification | User scans the Access table on the right. | Lists all assigned cemeteries (e.g., Astana Tegal Gundul), assigned roles (ADMIN), and login history. |


---


## Profile Dropdown - Log out, Help, About Chronicle


### Narration

Beyond the core operational tasks, the Admin relies on a set of global utilities to manage their session and seek assistance. The Help and About buttons serve as the platform's support layer, providing immediate access to documentation or system metadata without navigating away from the current task. Finally, the Logout function acts as the definitive end to the user journey; with a single click, the system securely purges active session data and returns the Admin to the gateway, ensuring the integrity of the Astana Tegal Gundul records remains protected until the next login.

### Mermaid Chart


### User Journey Table


| Action | Intent | System Result |
| --- | --- | --- |
| Help Button | Seek guidance or report a bug. | Opens a support widget or knowledge base overlay. |
| About Chronicle | Verify version or legal info. | Displays a modal with software version and "Made by" credits. |
| Logout | Securely end the session. | Clears local tokens and redirects to the Login screen. |


---

# User Journey: Role MANAGER


---


## DASBOARD - SIDEBAR


---


## MANAGER INVITATION & ONBOARDING


### Narration

The journey begins when a Manager receives a digital access invitation via an official email from the Chronicle system. This process is designed to ensure a secure transition from an external channel into the Astana Tegal Gundul management ecosystem. The Manager is guided through a one-click verification flow that eliminates administrative hurdles, allowing them to move immediately from account activation to active site management. The clean invitation interface with clear instructions minimizes cognitive load, ensuring that managerial personnel can instantly access spatial navigation tools and grave inventory data without complex manual configurations.

### Mermaid Chart


### User Journey Table


| Stage | User Action | System Response |
| --- | --- | --- |
| Notification | Manager receives and opens the email with the subject "Welcome to Astana Tegal Gundul." | Displays the official invitation email featuring a central call-to-action button labeled "CONTINUE." |
| Redirection | Manager clicks the "CONTINUE" button within the email body. | Validates the security token and redirects the Manager to the Chronicle authentication page. |
| Authentication | Manager logs in using registered credentials (Email, Google, or Microsoft). | Verifies manager permissions and links the account to the Astana Tegal Gundul organization. |
| Authorization | Manager reaches the Main Dashboard with the navigation sidebar active. | Loads the spatial module (Map) as the primary view and enables all Manager-level access rights. |
| Exploration | Manager accesses the Map tab to view initial statistics (e.g., Total Plots: 185). | Displays the inventory summary (Occupied, Vacant, Reserved) on the Administration panel. |


---


## MANAGER LOGIN & DASHBOARD ACCESS


### Narration

The Manager interacts with a clean, dual-pane interface where a somber, high-contrast image of a cemetery at dusk reinforces the platform's specific niche in death-care management. Upon reaching the page, the Manager is presented with a streamlined choice: leverage existing professional identities via Google or Microsoft for speed, or utilize a dedicated Chronicle account for localized security. The interface proactively manages errors by flagging empty required fields in red, ensuring the Manager corrects their input before attempting to proceed. Once authenticated, the transition from this gateway to the core application allows Cemetery Managers to move from security protocols to active site management and operational oversight.

### Mermaid Chart


### User Journey Table


| Stage | User Action | System Response |
| --- | --- | --- |
| Selection | Manager chooses an authentication method (Social, SSO, or Email). | Highlights the selected field or redirects to a third-party provider for identity verification. |
| Input | Manager enters their registered email address and password. | Validates data format in real-time (e.g., showing "This is a required field" for missing data). |
| Preference | Manager toggles "Remember me" for future sessions. | Stores a session cookie to bypass the login screen during the next operational shift. |
| Execution | Manager clicks the "LOGIN" button. | Authenticates credentials and grants access to the Managerial Dashboard and Map tools. |
| Recovery | Manager clicks "Forgot password?" if credentials are lost. | Redirects to the password reset flow to ensure continuous access to cemetery records. |


---


## MANAGER MAP DASHBOARD OPERATIONS


### Narration

The Manager accesses a comprehensive spatial dashboard designed for high-level oversight of the Organization's cemetery assets. The interface features a central interactive map alongside a dynamic administrative sidebar that provides real-time statistics on plot availability and interment status. Managers can toggle between "Administration" for operational data and "Public Info" for site-specific contact and location details. This centralized view allows the Manager to transition from broad site monitoring to specific task management—such as reviewing incoming requests or analyzing plot distribution—ensuring that all Organization resources are managed efficiently through a single, data-rich gateway.

### Mermaid Chart


### User Journey Table


| Stage | User Action | System Response |
| --- | --- | --- |
| Overview | Manager views the Map module to check current site status. | Displays an interactive map of the cemetery with a sidebar summary of total plots. |
| Inventory Audit | Manager reviews the Administration tab for plot breakdowns. | Shows real-time counts for Occupied, Vacant, and Reserved plots. |
| Service Tracking | Manager monitors Total Interments and burial types. | Provides data on burial methods and historical interment records. |
| Request Handling | Manager expands the Requests dropdown menu. | Reveals various service categories configured by the Organization. |
| Submission | Manager initiates a specific request (e.g., Monument Work). | Opens a digital form for Applicant data, location details, and document uploads. |
| Public Information | Manager switches to the Public Info tab. | Displays Organization address, operating hours, and official contact links. |


---


## MANAGER DATA MANAGEMENT (TABLES)


### Narration

The Manager interacts with a high-density data grid within the Tables module, which serves as the primary engine for auditing and expanding the Organization’s vast inventory. This interface focuses on pure data integrity, allowing the Manager to oversee thousands of records through a filterable tabular view. The journey is designed for high-level administration; the Manager can quickly isolate specific datasets using advanced Filters, generate offline reports via CSV Export, and perform direct inventory expansion using the Add Plot feature. This centralized data hub ensures the Manager has total visibility and the ability to update individual assets within the Organization efficiently.

### Mermaid Chart


### User Journey Table


| Stage | User Action | System Response |
| --- | --- | --- |
| Module Entry | Manager clicks the Tables menu from the sidebar. | Loads the primary data grid, defaulting to the Plots master list. |
| Data Filtering | Manager applies specific criteria using the Filter button. | Instantly narrows down the records based on Status, Section, or Plot Type. |
| Inventory Audit | Manager scans the Status, Price, and Capacity columns. | Displays real-time operational and financial data for each record. |
| Report Generation | Manager clicks the Export to CSV button. | Generates and downloads a spreadsheet containing the currently filtered dataset. |
| Inventory Expansion | Manager clicks the Add Plot button. | Opens a creation form to register new burial assets into the system. |
| Record Deep-dive | Manager identifies a specific Plot ID (e.g., "QA A 3a1"). | Provides a detailed look at Interments, Sections, and Row data for that unit. |


---


## MANAGER EVENT & SCHEDULE MANAGEMENT (CALENDAR)


### Narration

The Manager utilizes the Calendar module as the central coordination hub for the Organization’s daily operations. This interface allows the Manager to monitor all on-site activities—ranging from burials to memorial services—within an intuitive chronological view. Leveraging advanced Filtering capabilities, the Manager can isolate tasks by Event Type, Completion Status, and Responsible Personnel to ensure operational punctuality. Beyond simple scheduling, the Manager performs Administrative Integration by using the Add New Event feature, which links specific events directly to Plot data, purchaser information, and financial records. This ensures that every field operation is backed by accurate documentation and real-time status tracking.

### Mermaid Chart


| Stage | User Action | System Response |
| --- | --- | --- |
| Module Entry | Manager clicks the Calendar icon from the sidebar. | Renders the monthly calendar view with event markers and a side task list. |
| Schedule Filtering | Manager applies filters (Event Type, Sub Type, Status, Due Date, Assigned Business). | Instantly updates the side list to display tasks matching the specific administrative criteria. |
| Task Oversight | Manager reviews the list for Completion Status and upcoming deadlines. | Highlights urgent or overdue events that require immediate managerial attention. |
| Event Creation | Manager clicks the Add New Event button. | Launches a comprehensive form for event naming, categorization, and location assignment. |
| Data Synchronization | Manager enters Purchase Details (Amount, Purchaser Info, Address) and uploads Documents. | Synchronizes the event with the financial database and stores legal attachments (Max 8MB). |
| Assignment | Manager assigns a Responsible Person and Assigned Business to the event. | Delegates the task and ensures the designated personnel are notified of their responsibilities. |


---


## MANAGER REQUEST REVIEW & APPROVAL WORKFLOW


### Narration

The Manager utilizes the Request module as the primary gateway for processing and validating all service applications submitted to the Organization. This module functions as a centralized queue where the Manager can monitor the status of various requests—such as plot purchases or service orders—categorized by urgency (At-need vs. Pre-need). By leveraging advanced Filtering, the Manager can isolate specific requests by date, applicant name, or status to maintain an efficient workflow. Upon opening a specific request, the Manager gains access to a comprehensive Detail View containing plot locations, applicant contact info, pricing, and signed terms. This enables the Manager to perform a thorough audit before final Approval or Rejection, ensuring every transaction adheres to the Organization’s legal and operational standards.

### Mermaid Chart


### User Journey Table


| Stage | User Action | System Response |
| --- | --- | --- |
| Queue Oversight | Manager accesses the Request module to view incoming applications. | Displays a list of requests with columns for Type, Sub-type, Plot ID, and Status (OPEN/APPROVED). |
| Request Filtering | Manager uses the Filter tool (Name, Type, Date Range, Status). | Refines the list to show specific applications like "Pre-need Sales" or "Open Status". |
| Application Audit | Manager clicks on a specific request (e.g., "Purchase plot by Test"). | Opens the Request Detail panel showing Plot ID, Price ($200), and Payment Status. |
| Applicant Review | Manager scrolls to the ROI Applicant and ROI sections. | Displays full personal details, contact info, Right Type (Burial), and Term (Perpetual). |
| Legal Verification | Manager reviews attached Documents and the Digital Signature. | Validates that the applicant has agreed to the Terms and Conditions for plot purchasing. |
| Final Decision | Manager clicks Approve or Reject after the review. | Updates the request status, triggers system notifications, and prepares the plot for interment rights. |


---


## MANAGER ANALYTICS & CUSTOM REPORTING


### Narration

The Manager utilizes the Reports module as the organization's strategic intelligence center. The hub provides immediate access to critical data categories—such as Inventory, Right of Interment (ROI), and Business analytics—while maintaining efficiency through a Favorites system and a list of Recent Reports. The reporting process is highly dynamic: the Manager must define the Area (specific Cemeteries or Sections), choose the output Format (XLSX or PDF), and select specific Attributes that vary depending on the report type. The system proactively ensures data legibility by issuing warnings if selected attributes exceed the capacity of a PDF layout. Once generated, reports are stored in a temporary cache for 14 days, providing the Manager with a window to download and distribute official documentation before automatic system deletion.

### Mermaid Chart


### User Journey Table


| Stage | User Action | System Response |
| --- | --- | --- |
| Hub Access | Manager enters the Reports tab to review or create data summaries. | Displays the report category grid, Recent Reports (with timestamps/formats), and Favorites. |
| Type Selection | Manager selects a report category (e.g., ROI, Business, or User Log). | Opens the specific configuration panel for the selected report type. |
| Scope Definition | Manager selects the Area (Cemeteries or specific Sections). | Isolates the dataset to the chosen physical boundaries of the Organization. |
| Configuration | Manager sets Options like Format, Report Chapters, or Date Range. | Adjusts the report structure; displays a warning if attributes are "Too many for PDF." |
| Attribute Selection | Manager selects specific data points (Attributes) to include. | Dynamically updates the data schema based on the report type (e.g., ROI details vs Business names). |
| Generation | Manager clicks the Create Report button. | Processes the request and adds the new file (XLSX/PDF) to the Recent Reports queue. |
| Retention & Export | Manager downloads the generated report for official use. | Provides access to the file for 2 weeks before the system performs an automatic deletion. |


---


## DASBOARD - TOOLBAR


---


## MANAGER GLOBAL COMMAND & COMMAND CENTER (TOOLBAR)


### Narration

The Manager utilizes the Global Navigation Bar (Toolbar) as the primary nerve center for high-frequency operations. This interface is designed to provide immediate access to four critical pillars: Instant Data Retrieval (1), Strategic Auditing (2), System Awareness (3), and Account Access (4). The journey begins with rapid surface-level searches—displaying high-density data such as plot occupancy and deceased lifespans—and extends to deep-dive administrative audits through modular advanced filters. Additionally, the Toolbar serves as the gateway to personal administration, allowing the Manager to monitor system notifications and access the profile dropdown for deeper account configurations and support resources.

### Mermaid Chart


### User Journey Table


| Stage | Feature No. | User Action | System Response |
| --- | --- | --- | --- |
| Instant Search | 1 | Manager enters a name or Plot ID in the Search Bar. | Displays quick results for People or Plots, including Occupancy (e.g., 1/3) and Plot Type. |
| Modular Audit | 2 | Manager opens Advanced Search and selects a specific module. | Provides granular filtering (ROI, Interment, Stakeholders) by Personal or Business ID. |
| Alert Monitoring | 3 | Manager checks the Notification icon. | Provides real-time updates on operational tasks and system-wide changes. |
| Account Access | 4 | Manager clicks the Profile Dropdown. | Reveals User Identity, My Profile/Settings, Help Center, About, and Logout options. |
| Support & Info | 4a | Manager accesses Help Center or About. | Provides a comprehensive Knowledge Base (Admin, Legal, Technical) or versioning information. |


---


## MANAGER ACCOUNT & SECURITY CONFIGURATION (MY PROFILE)


### Narration

The Manager utilizes the My Profile dashboard as a personal administrative hub to manage their digital identity and secure their access to the system. This interface is structured into three distinct functional zones: Identity Management, where the Manager can update contact details and reset the Osiris API Key for system synchronization; Authentication Security, which manages active login methods (e.g., Password) and third-party integrations (Google, Facebook, Microsoft); and Operational Access, where the Manager verifies their assigned Role and the specific Cemeteries they are authorized to manage. Additionally, the system provides a clear audit trail of the account’s timeline, including the date the account was created and the timestamp of the last successful login, ensuring complete transparency and security.

### Mermaid Chart


### User Journey Table


| Stage | Section | User Action | System Response |
| --- | --- | --- | --- |
| Identity Setup | User Identity | Manager updates Name, Phone, and differentiates Login vs. Notification Email. | Saves personal credentials and updates the communication channel for system alerts. |
| Sync Control | Osiris API | Manager clicks the Reset Osiris API Key button. | Generates a new API key to refresh the secure data synchronization with the backend. |
| Security Config | Login Methods | Manager reviews current password or links Google/FB/Microsoft accounts. | Updates the authentication layer and provides alternative secure login options. |
| Privilege Audit | Access | Manager verifies their Role (Manager) and Assigned Cemetery. | Confirms the boundaries of the Manager's authority within the Organization. |
| Timeline Review | History | Manager checks the Added Date and Last Login timestamp. | Provides an audit trail to monitor account activity and registration history. |


---


## SYSTEM SUPPORT & SECURITY TERMINALS (HELP, ABOUT, LOGOUT)


### Narration

Beyond operational tasks, the Manager utilizes the secondary toolbar functions to ensure continuous learning and account security. The Help Center serves as a comprehensive self-service knowledge base, allowing the Manager to troubleshoot technical issues and master workflows—ranging from Basic Operations to Legal/Financial Integration—without external assistance. Meanwhile, the About section provides the strategic context of the system's mission, and the Logout function ensures that the Manager can securely terminate their session, upholding the Organization’s data privacy standards.

### Mermaid Chart


### User Journey Table


| Category | Coverage / Action | Functional Value |
| --- | --- | --- |
| Help: Operations | Navigation (Getting Started), Plot Editing, and Interment records. | Ensures smooth day-to-day cemetery management. |
| Help: Admin & Legal | ROI Documentation, Certificates, Sales, and Payments. | Maintains legal compliance and financial accuracy. |
| Help: Tasks & Analysis | Work Orders, Activity Logs, and Report Generation. | Enhances managerial oversight and data-driven decisions. |
| Help: Technical | Release Notes, Billing, and Contact Support. | Provides direct updates and technical escalation paths. |
| About Chronicle | System mission, Archive management, and Onboarding links. | Provides organizational context and platform resources. |
| Category | Coverage / Action | Functional Value |
| Logout | Secure Session Termination. | Protects sensitive data from unauthorized access. |


---

