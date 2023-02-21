# honeypot

Honeypot example to help with spam form submissions

Clone an example from Made in Webflow:

https://webflow.com/made-in-webflow/website/testing-honeypot

## Learn how to use a honeypot in Webflow

I'm just following the great advice and guidance provided by Felippe Regazio. [In an article on dev.to](https://dev.to/felipperegazio/how-to-create-a-simple-honeypot-to-protect-your-web-forms-from-spammers--25n8), he provided some great guidance and I would recommend reading through the entire post there. I'm also referencing [a wonderful article from Rachele DiTullio](https://racheleditullio.com/blog/2020/04/add-an-accessible-honeypot-field-to-your-php-form/) to make sure it's accessibility friendly. [WCAG recommends using honeypots for your forms](https://www.w3.org/TR/turingtest/#conclusion) to deflect bots and keep things accessible.

### Styling your hidden elements

Add in some inputs and make sure they have realistic names that a bot wouldn't be fooled by. Wrap them in a div and add a class. I did this and my class is business. Then I set the CSS in Webflow to the following:

```css
.business {
  position: absolute;
  left: 0%;
  top: 0%;
  right: auto;
  bottom: auto;
  z-index: -1;
  overflow: hidden;
  width: 0px;
  height: 0px;
  opacity: 0;
}
```

Make sure your hidden input is also set to display:none so that users can't tab over to index it. Or, if you want to leave it with display: block, then you can try adding a custom attribute of tabindex="-1".

Also, make sure the label on for the hidden input has a custom attribute of aria-hidden="true". This will prevent screen readers from reading that label.

Now your form is set so that sighted users and users who rely on assistive technology will never know that hidden input exists.

### Adding ids to elements in Webflow

In Webflow, you'll want to make sure and add ids to two elements. You'll need an id for your honeypot input. In this example we're using `work-email` for ours. Your form may actually have a field named that so you may need to change this up. Just make sure that whatever you choose has a real world naming convention so that the bot doesn't skip this field.

You'll also need an id for your submit button in Webflow and in our example we're using `submit`. We'll use these in our JavaScript to check if the bot filled our honeypot input and then disable the submit button if they have.

### Using JavaScript to prevent submission

Now you need to use JavaScript to prevent the form from submitting if the honeypot filled is submitted. What I did, was added an event on input that disables the submit button. Feel free to improve this or try other methods.

A lot of the time, folks check to see if it's spam on the backend if that field exists and has been filled out. But, that still allows submissions to go through so set this up in a way that works best for you. Here's my JS I'm using:

```js
const submit = document.querySelector("#submit");
const honeypot = document.querySelector("#work-email");

honeypot.oninput = function () {
  if (honeypot.value.length > 0) {
    submit.disabled = true;
  }
};
```

Here we're disabling the submit button as soon as something is added to our honeypot input. You could also check to see if that input is empty when someone hits submit and `return false;` if it's filled in.

Learn more about form validation in Webflow in this repo:

https://github.com/Webflow-Examples/form-validation
