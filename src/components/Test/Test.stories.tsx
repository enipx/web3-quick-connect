import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';

const Button = (args: any) => {
  return (
    <button type="button" {...args}>
      {args?.text || 'Connect'}
    </button>
  );
};

export default {
  title: 'Components/Test',
  component: Button,
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Default = Template.bind({});
Default.args = {};
