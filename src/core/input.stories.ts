import "./register-auto";

export default {
  title: "Components/App Input",

  argTypes: {
    label: {
      control: "text",
      description: "Label displayed above the input.",
    },
    placeholder: {
      control: "text",
      description: "Placeholder text shown when the input is empty.",
    },
    type: {
      control: "select",
      options: ["text", "email", "password", "number", "tel", "url"],
      description: "HTML input type.",
    },
    help: {
      control: "text",
      description: "Help or validation message displayed below the input.",
    },
    validation: {
      control: "select",
      options: ["", "valid", "invalid"],
      description: "Validation state that controls the input styling.",
    },
    disabled: {
      control: "boolean",
      description: "Whether the input is disabled.",
    },
    required: {
      control: "boolean",
      description: "Whether the input is required.",
    },
    value: {
      control: "text",
      description: "Initial input value.",
    },
  },

  args: {
    label: "Name",
    placeholder: "Enter your name",
    type: "text",
    help: "",
    validation: "",
    disabled: false,
    required: false,
    value: "",
  },

  render: (args) => {
    const input = document.createElement("app-input");

    input.setAttribute("label", args.label);
    input.setAttribute("placeholder", args.placeholder);
    input.setAttribute("type", args.type);
    input.setAttribute("help", args.help);
    input.setAttribute("validation", args.validation);
    input.setAttribute("value", args.value);

    if (args.disabled) {
      input.setAttribute("disabled", "");
    }

    if (args.required) {
      input.setAttribute("required", "");
    }

    return input;
  },
};

export const Default = {};

export const Required = {
  args: {
    label: "Email address",
    placeholder: "you@example.com",
    type: "email",
    required: true,
    help: "Please enter your email address.",
  },
};

export const Valid = {
  args: {
    label: "Username",
    value: "jane_doe",
    validation: "valid",
    help: "Username is available.",
  },
};

export const Invalid = {
  args: {
    label: "Email address",
    value: "not-an-email",
    type: "email",
    validation: "invalid",
    help: "Please enter a valid email address.",
  },
};

export const Password = {
  args: {
    label: "Password",
    placeholder: "Enter your password",
    type: "password",
    required: true,
  },
};

export const Disabled = {
  args: {
    label: "Account ID",
    value: "USR-1024",
    disabled: true,
    help: "This field cannot be edited.",
  },
};
