# Chronicle Knowledge Base — Role: ADMIN

_Extracted from knowledgeChronicle.docx_

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

