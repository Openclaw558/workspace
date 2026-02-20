# Chronicle Knowledge Base — Role: MANAGER

_Extracted from knowledgeChronicle.docx_

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

