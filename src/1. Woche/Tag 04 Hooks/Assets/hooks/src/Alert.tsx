import { useState, type ReactNode } from 'react';

type Props = {
  type?: string;
  heading: string;
  children: ReactNode;
  closable?: boolean;
  onClose?: () => void;
};

export function Alert({ type = 'information', heading, children, closable, onClose }: Props) {
  // generisches Argument <TYPE>
  // const [visible, setVisible] = useState<boolean>();
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  function handleCloseClick() {
    setVisible(false);
    if (onClose) {
      onClose();
    }
  }

  return (
    <div>
      <div>
        <span role="img" arial-label={type === 'warning' ? 'Warning' : 'Information'}>
          {type === 'warning' ? '!' : 'Info'}
        </span>
        <span>{heading}</span>
      </div>
      {closable && (
        <button onClick={handleCloseClick} arial-label="Close">
          <span role="img" aria-label="Close">
            X
          </span>
        </button>
      )}
      <div>{children}</div>
    </div>
  );
}
