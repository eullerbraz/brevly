export type CopyToastProps = {
  link: string;
};

export function CopyToast({ link }: CopyToastProps) {
  return (
    <>
      <span className='font-semibold'>Link copiado com sucesso</span>
      <div className='text-sm'>
        O link {link} foi copiado para a área de transferência.
      </div>
    </>
  );
}
