// src/utils/errorHandler.ts

interface ErrorResponse {
    status: number;
    data: {
      error: string;
    };
  }
  
  export const handleApiError = (error: any): string => {
    if (error.response) {
      const { status, data }: ErrorResponse = error.response;
  
      switch (status) {
        case 400:
          return 'Usuário não encontrado.';
        case 401:
          return 'Credenciais inválidas. Por favor, tente novamente.';
        case 403:
          if (data.error === 'Usuário não autorizado para essa empresa') {
            return 'Usuário não autorizado para essa empresa.';
          }
          return 'Usuário ou senha incorretos ou Usuário inativo.';
        case 404:
          return 'Usuário não encontrado.';
        case 500:
          return 'Erro interno do servidor. Por favor, tente novamente mais tarde.';
        default:
          return 'Ocorreu um erro inesperado. Tente novamente mais tarde.';
      }
    } else {
      return 'Ocorreu um erro inesperado. Tente novamente mais tarde.';
    }
  };
  