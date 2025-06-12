# Listing Popup

**Listing Popup** is a base skeleton component that assist creation of:-

 - Listing Page
 - Detail Page
 - Edit/Create Page

**Listing** is base page, **Detail**, **Edit/Create** is full page popup on top of **Listing**.

The component consist of:-

    base-detail/
	    base-detail.component.html
		base-detail.component.ts
    base-edit/
	    base-edit.component.ts
    helpers/
	    listing-popup-breadcrumb/
    base-api.service.ts
    base-listing-popup-page.interface.ts
    base-listing.component.html
    base-listing.component.ts
    base-listing.model.ts
    listing-popup.scss
    readme.MD

## Pro

 1. Any state in **Listing** is maintain even after user return from **Detail**, **Edit/Create**.

## Con

 1. **Listing** data will loaded even when user is viewing **Detail**, **Edit/Create**.

# How to use

Copy the ***listing-popup*** folder to your project folder.
You can paste it under any folder.

## Route format

    { path: 'listing', component: ListingComponent, children: [
        { path: 'detail', redirectTo: '' }, // Redirect to list when no id param.
        { path: 'detail/:id', component: DetailComponent },
        { path: 'detail/:id/edit', component: EditComponent },
        { path: 'create', component: EditComponent },
    ] },

**Listing** is the base page for the component.
**Detail**, **Edit/Create** page is full page popup display on top of **Listing**.

## Listing

Make your list component to extend the **ListingPopupBaseComponent**.

## Detail

Make your detail component to extend the **ListingPopupDetailComponent**.

## Edit/Create

Make your detail component to extend the **ListingPopupEditComponent**.

