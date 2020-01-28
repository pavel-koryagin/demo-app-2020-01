import React, { ReactNode, useContext, useState } from 'react';
import _filter from 'lodash/filter';
import ConfirmDialog, { ConfirmProps } from '../views/ConfirmDialog';

// Usage API

interface Dialogs {
  confirm(props: ConfirmProps): void;
}

export function useDialog(): Dialogs {
  const { add } = useContext(DialogContext);
  return {
    confirm(props) {
      add(
        (key, internalProps) =>
          <ConfirmDialog {...props} {...internalProps} key={key} />
      );
    },
  };
}


// Implementation and Provider API

export interface InternalDialogViewProps {
  onClose: () => void;
}

type RenderDialog = (key: number, props: InternalDialogViewProps) => ReactNode;

interface ContextEntry {
  key: number;
  render: RenderDialog;
  props: InternalDialogViewProps;
}

interface DialogContextInterface {
  add(render: RenderDialog): void;
}

const DialogContext = React.createContext<DialogContextInterface>({
  add() {},
});

let lastId = 0;

type Props = {
  children: ReactNode,
};

export function DialogsProvider({ children }: Props) {
  const [dialogs, setDialogs] = useState<ContextEntry[]>([]);

  function close(propsKey: number) {
    setDialogs(_filter(dialogs, ({ key }) => key !== propsKey));
  }

  return (
    <DialogContext.Provider
      value={{
        add(render) {
          const key = ++lastId;
          setDialogs([
            ...dialogs,
            {
              render,
              key,
              props: {
                onClose: () => close(key),
              },
            },
          ])
        }
      }}
    >
      {children}
      {dialogs.map(({ render, key, props }) => render(key, props))}
    </DialogContext.Provider>
  );
}
