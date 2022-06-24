export interface UpdateConversationFormProps {
  onClose: () => void;
  onSubmit: (values) => void;
  conversationName?: string;
}

export interface UpdateConversationFormInput {
  name: string;
}
