import { Button } from 'flowbite-react';

export default function FormAction({
  handleSubmit,
  type = 'Button',
  action = 'submit',
  text,
  loading,
}: {
  loading?: boolean;
  action?: 'reset' | 'button' | 'submit';
  text?: string;
  type?: 'Button';
  handleSubmit: (e: React.FormEvent<HTMLButtonElement>) => void;
}) {
  return (
    <>
      {type === 'Button' ? (
        <Button
          isProcessing={loading}
          type={action}
          size="lg"
          className="group relative w-full flex justify-center border border-transparent text-sm font-medium rounded-md text-white  focus:outline-none focus:ring-2 focus:ring-offset-2 mt-10"
          onSubmit={handleSubmit}
        >
          {text}
        </Button>
      ) : (
        <></>
      )}
    </>
  );
}
