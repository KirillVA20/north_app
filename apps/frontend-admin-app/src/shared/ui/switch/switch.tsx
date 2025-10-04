import { Switch as ChakraSwitch } from '@chakra-ui/react';

export type SwitchProps = {
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  label?: string;
  onCheckedChange?: (checked: boolean) => void;
};

export const Switch = ({
  checked,
  defaultChecked,
  disabled,
  label,
  onCheckedChange,
}: SwitchProps) => (
  <ChakraSwitch.Root
    checked={checked}
    defaultChecked={defaultChecked}
    disabled={disabled}
    onCheckedChange={(e) => onCheckedChange?.(!!e.checked)}
  >
    <ChakraSwitch.HiddenInput />
    <ChakraSwitch.Label>{label}</ChakraSwitch.Label>
    <ChakraSwitch.Control>
      <ChakraSwitch.Thumb />
    </ChakraSwitch.Control>
  </ChakraSwitch.Root>
);
