import { Alert, Button } from '@chakra-ui/react';
import { ReactNode } from 'react';

type AlertStatus = 'success' | 'info' | 'warning' | 'error';

type AlertMessageProps = {
  status: AlertStatus;
  title: string;
  description?: ReactNode;
  actionLabel?: string;
  onActionClick?: () => void;
  showIndicator?: boolean;
};

export const AlertMessage = ({
  status,
  title,
  description,
  actionLabel,
  onActionClick,
  showIndicator = true,
}: AlertMessageProps) => {
  return (
    <Alert.Root status={status}>
      {showIndicator ? <Alert.Indicator /> : null}
      <Alert.Content>
        <Alert.Title>{title}</Alert.Title>
        {description ? (
          <Alert.Description>{description}</Alert.Description>
        ) : null}
        {actionLabel && onActionClick ? (
          <Button size="sm" ml={3} onClick={onActionClick}>
            {actionLabel}
          </Button>
        ) : null}
      </Alert.Content>
    </Alert.Root>
  );
};
