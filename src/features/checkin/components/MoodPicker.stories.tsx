import type { Meta, StoryObj } from '@storybook/react-vite';
import { MoodPicker } from './MoodPicker';
import { useState } from 'react';
import type { Mood } from '../../../core/types';

const meta: Meta<typeof MoodPicker> = {
  title: 'Features/CheckIn/MoodPicker',
  component: MoodPicker,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [mood, setMood] = useState<Mood | null>(null);
    return (
      <div style={{ width: '500px' }}>
        <MoodPicker selectedMood={mood} onSelect={setMood} />
      </div>
    );
  },
};

export const Selected: Story = {
  args: {
    selectedMood: 'great',
  },
};
