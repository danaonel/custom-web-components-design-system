import "./register-auto";

export default {
  title: "Components/App Counter",

  argTypes: {
    until: {
      control: { type: "number" },
      description: "The number at which the counter stops.",
      table: {
        defaultValue: { summary: 10 },
      },
    },
  },

  args: {
    until: 10,
  },

  render: (args: any) => {
    const counter = document.createElement("app-counter");
    counter.setAttribute("until", String(args.until));
    return counter;
  },
};

export const Default = {};

export const CountToFive = {
  args: {
    until: 5,
  },
};

