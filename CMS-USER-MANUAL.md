# 📚 FtiAxesite.gr CMS User Manual

**Complete Guide to Managing Your Website Content**

---

## 🔐 Getting Started

### Login Information
- **Admin URL**: http://localhost:3001/admin
- **Email**: `admin@ftiaxesite.com`
- **Password**: `admin123`

### First Time Setup
1. Open your browser and navigate to http://localhost:3001/admin
2. Enter your login credentials
3. You'll see the main dashboard with Collections and Globals

---

## 📋 Dashboard Overview

When you log in, you'll see the main navigation with:

### **Collections** (Multiple Items)
- **Media** - Upload and manage images, documents
- **Pages** - Create additional pages (About, Services, etc.)
- **Users** - Manage admin users

### **Globals** (Single Items)
- **Homepage** - Edit your main landing page content

---

## 🏠 Managing Homepage Content

The Homepage is your main landing page with all the Greek content. Click **Globals → Homepage** to edit.

### **Hero Section**
Edit the top banner of your website:

**Fields Available:**
- **Badge**: Small text above headline (currently: "Αναπτύξουμε Websites")
- **Headline**: Main title (currently: "Δημιουργούμε το ιστότοπό σας σε 48 ώρες")
- **Subheadline**: Description paragraph
- **CTA Text**: Button text (currently: "Ξεκινήστε Τώρα")
- **Hero Image**: Upload a background image for the hero section
- **Social Proof**: Text under the CTA button
- **Stats**: Add/edit statistics (value + label pairs)

**How to Edit:**
1. Click **Globals → Homepage**
2. Expand the **Hero** section
3. Edit any field you want to change
4. Click **Save** at the bottom

### **Features Section**
Edit the "Γιατί να Επιλέξετε το ftiaxesite.gr" section:

**Fields Available:**
- **Title**: Section headline
- **Subtitle**: Section description
- **Items**: Array of features (each with icon, title, description)

**How to Add/Edit Features:**
1. In Homepage → Features → Items
2. Click **Add Item** to create new feature
3. Fill in:
   - **Icon**: Text name for icon (e.g., "Zap", "Smartphone", "Shield")
   - **Title**: Feature name
   - **Description**: Feature description
4. Use **drag handles** to reorder features
5. Click **X** to delete unwanted features

### **Process Section**
Edit the step-by-step process:

**Fields Available:**
- **Title**: Section headline
- **Subtitle**: Section description  
- **Steps**: Array of process steps

**How to Edit Steps:**
1. In Homepage → Process → Steps
2. Each step has:
   - **Number**: Step number (1, 2, 3, etc.)
   - **Icon**: Icon name for the step
   - **Title**: Step title
   - **Description**: Step description
   - **Color**: Choose "teal" or "navy" for styling

### **Contact Section**
Edit the contact form area:

**Fields Available:**
- **Title**: Contact section headline
- **Subtitle**: Contact section description
- **Form Labels**: All the text labels for the contact form
  - Name field label
  - Email field label
  - Phone field label
  - Voice prompt text
  - Voice listening text
  - Voice transcript label
  - Submit button text

---

## 📁 Media Management

Upload and organize images, documents, and files.

### **Uploading Files**
1. Click **Collections → Media**
2. Click **Create New**
3. **Drag and drop** files or click to browse
4. Add **Alt Text** (important for SEO and accessibility)
5. Add **Caption** (optional description)
6. Click **Create**

### **Supported File Types**
- **Images**: JPG, PNG, GIF, WebP, SVG
- **Documents**: PDF, Word documents (.doc, .docx)

### **Image Sizes**
The system automatically creates multiple sizes:
- **Thumbnail**: 400×300px (for admin previews)
- **Card**: 768×1024px (for content cards)
- **Tablet**: 1024px wide (for larger displays)

### **Using Images in Content**
1. Upload your image to Media first
2. In Homepage or Pages, look for **Upload** fields
3. Click the field and select from your uploaded media
4. The image will be automatically optimized

---

## 📄 Page Management

Create additional pages for your website (About, Services, Contact, etc.)

### **Creating a New Page**
1. Click **Collections → Pages**
2. Click **Create New**
3. Fill in the required fields:
   - **Title**: Page title (appears in browser tab)
   - **Slug**: URL path (e.g., "about" becomes "/about")
   - **Content**: Rich text content using the editor
   - **Status**: Choose "Draft" or "Published"

### **Rich Text Editor**
The content editor supports:
- **Headings**: H1, H2, H3, etc.
- **Text Formatting**: Bold, italic, underline
- **Lists**: Bullet points and numbered lists
- **Links**: Add links to other pages or external sites
- **Images**: Insert images from your Media collection

### **Publishing Pages**
- **Draft**: Page exists but not visible on website
- **Published**: Page is live and accessible to visitors

---

## 👥 User Management

Manage who can access the admin panel.

### **Adding New Users**
1. Click **Collections → Users**
2. Click **Create New**
3. Fill in:
   - **Email**: Login email address
   - **Password**: Strong password
   - **First Name**: User's first name
   - **Last Name**: User's last name

### **User Permissions**
All users have full admin access. Be careful who you give access to.

---

## 💡 Content Tips & Best Practices

### **SEO Best Practices**
- Use descriptive titles and headings
- Add alt text to all images
- Keep URLs simple and clean (use good slugs)
- Write clear, helpful content

### **Image Optimization**
- Use high-quality images (they'll be automatically compressed)
- Add meaningful alt text for accessibility
- Choose appropriate file names before uploading

### **Content Writing**
- Keep headlines clear and descriptive
- Use short paragraphs for better readability
- Include relevant keywords naturally
- Make sure all Greek text displays correctly

### **Mobile-First**
- Your content automatically adapts to mobile devices
- Keep text readable and buttons easily clickable
- Test how your content looks on different screen sizes

---

## 🔧 Common Tasks

### **Changing the Main Headline**
1. **Globals → Homepage**
2. **Hero → Headline**
3. Edit the text
4. **Save**

### **Adding a New Feature**
1. **Globals → Homepage**
2. **Features → Items**
3. **Add Item**
4. Fill in icon, title, description
5. **Save**

### **Updating Contact Information**
1. **Globals → Homepage**
2. **Contact → Form Labels**
3. Edit any text labels
4. **Save**

### **Creating an About Page**
1. **Collections → Pages**
2. **Create New**
3. Title: "About Us", Slug: "about"
4. Write content in the rich text editor
5. Status: "Published"
6. **Create**

---

## 🚨 Troubleshooting

### **Can't Upload Images**
- Check file size (keep under 10MB)
- Ensure file is a supported format
- Try refreshing the page

### **Changes Not Showing**
- Make sure you clicked **Save**
- Check if page status is "Published"
- Try refreshing your website

### **Forgot Password**
- Click "Forgot Password" on login page
- Check terminal/console for reset link (email not configured)
- Or contact your developer to reset manually

### **Page Not Found**
- Check the page slug matches the URL
- Ensure page status is "Published"
- Verify there are no typos in the slug

---

## 📞 Support

### **Technical Support**
If you encounter technical issues:
1. Check this manual first
2. Try refreshing the admin panel
3. Contact your developer with specific error messages

### **Content Questions**
For help with content strategy or writing:
1. Review the "Content Tips" section
2. Look at existing successful content as examples
3. Consider your audience and their needs

---

## 🎯 Quick Reference

### **Essential URLs**
- **Website**: http://localhost:3001
- **Admin Panel**: http://localhost:3001/admin

### **Key Admin Sections**
- **Homepage Content**: Globals → Homepage
- **Upload Images**: Collections → Media
- **Create Pages**: Collections → Pages
- **Manage Users**: Collections → Users

### **Important Fields**
- **Slugs**: Must be unique, no spaces, lowercase
- **Alt Text**: Required for all images
- **Status**: Draft vs Published controls visibility

### **File Limits**
- **Images**: JPG, PNG, GIF, WebP, SVG
- **Documents**: PDF, Word files
- **Size**: Keep under 10MB for best performance

---

**🎉 You're Ready to Manage Your Website!**

This CMS gives you complete control over your FtiAxesite.gr content. Start with small changes to get comfortable, then expand to creating new pages and uploading media. Your website will automatically update with any changes you make.