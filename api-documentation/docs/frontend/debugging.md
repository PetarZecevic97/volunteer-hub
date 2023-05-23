---
title: Debugging
sidebar_label: 'Debugging'
sidebar_position: 4
---

# Debugging

To make life easier for people developing our React application, a debug panel was implemented to
let you manipulate your privileges as well as how the app behaves at a click of a button.

## The Debug panel
When you run the React app as a dev build, the app will automatically display a button at the top right
of the navigation bar which will lead you to the debug panel, note that most of these options can technically
be triggered/changed in a production build, but most of them won't have an effect
on the app's behaviour for safety reasons.

Options:
- `Username` - this will change your current username, without any security measures whatsoever (if disabled)
- `Email` - changes your current email, without any security measures whatsoever (if disabled)
- Account flags:
  1. `Admin toggle` - changes your current role to `admin` if enabled (is `user` otherwise)
  2. `JWT toggle` - disables the need for JWT token check
  3. `All visibility toggle` - if enabled, can see all the information for every user, as if they're that specific user
     (has edit access on every organization and volunteer account)
  4. `Auth toggle` - disables all password checks, user system, authentication, authorization and security 
     whatsoever on the application
  5. `Volunteer toggle` - if enabled, appear in the application as a volunteer
  6. `Organization toggle` - if enabled, appear in the application as an organization*

![](https://i.imgur.com/wiICVrC.png)
