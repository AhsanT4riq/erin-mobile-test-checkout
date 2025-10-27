export type CheckoutStep = {
  id: string;
  label: string;
  status: StepStatus;
  error?: string;
};

export type CheckoutProgressModalProps = {
  visible: boolean;
  steps: CheckoutStep[];
  onRetry: () => void;
  onClose: () => void;
};

export type StepStatus = 'pending' | 'processing' | 'completed' | 'error';
