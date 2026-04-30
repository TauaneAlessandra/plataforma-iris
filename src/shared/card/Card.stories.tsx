import type { Meta, StoryObj } from '@storybook/react-vite';
import { Card } from './Card';

const meta: Meta<typeof Card> = {
  title: 'Shared/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'glass', 'outline'],
    },
    padding: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: 'default',
    padding: 'md',
    children: (
      <div style={{ color: 'white' }}>
        <h3>Default Card</h3>
        <p>This is a standard card container with surface background.</p>
      </div>
    ),
  },
};

export const Glass: Story = {
  args: {
    variant: 'glass',
    padding: 'lg',
    children: (
      <div style={{ color: 'white' }}>
        <h3>Glassmorphism Card</h3>
        <p>This card uses backdrop-filter for a premium glass effect.</p>
      </div>
    ),
  },
};

export const Outline: Story = {
  args: {
    variant: 'outline',
    padding: 'md',
    children: (
      <div style={{ color: 'white' }}>
        <h3>Outline Card</h3>
        <p>A simple bordered card with transparent background.</p>
      </div>
    ),
  },
};

export const Interactive: Story = {
  args: {
    variant: 'glass',
    padding: 'md',
    onClick: () => alert('Card clicked!'),
    children: (
      <div style={{ color: 'white' }}>
        <h3>Click Me</h3>
        <p>Hover and click to see the interactive effects.</p>
      </div>
    ),
  },
};
