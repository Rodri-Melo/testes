import React from "react";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import App from "./App";

describe("Testes do componente App", () => {
  afterEach(cleanup);

  test("Elementos iniciais da página", () => {
    render(<App />);
    const title = screen.getByText(/Tarefas/i);
    const btnAdd = screen.getByText("Adicionar");
    const btnRem = screen.getByText("Remover Todos");
    const input = screen.getByPlaceholderText("digite sua tarefa");

    expect(title).toBeInTheDocument();
    expect(btnAdd).toBeInTheDocument();
    expect(btnRem).toBeInTheDocument();
    expect(input).toBeInTheDocument();
  });

  test("Adiciona um item e verifica os botões dos itens", () => {
    render(<App />);

    const input = screen.getByPlaceholderText("digite sua tarefa");
    fireEvent.change(input, { target: { value: "Nova Tarefa" } });

    const btnAdd = screen.getByText("Adicionar");
    fireEvent.click(btnAdd);

    const newItem = screen.getByText("Nova Tarefa");
    expect(newItem).toBeInTheDocument();

    const btnRem = screen.getByText("Remover");
    const btnEdit = screen.getByText("Editar");
    const btnSuccess = screen.getByText("Concluido");

    expect(btnRem).toBeInTheDocument();
    expect(btnEdit).toBeInTheDocument();
    expect(btnSuccess).toBeInTheDocument();
  });

  test("Testa o botão de editar em caso de edição", () => {
    render(<App />);

    const btnEdit = screen.getAllByText("Editar")[0];
    fireEvent.click(btnEdit);

    const inputEdit = document.querySelector(".input-edit");
    const btnSave = screen.getByText("Salvar");

    expect(inputEdit).toBeInTheDocument();
    expect(btnSave).toBeInTheDocument();

    fireEvent.change(inputEdit, { target: { value: "Novo Valor" } });
    fireEvent.click(btnSave);

    const newValue = screen.getByText("Novo Valor");
    expect(newValue).toBeInTheDocument();

    expect(btnSave).not.toBeInTheDocument();
  });

  test("Testa o botão de editar em caso de cancelamento", () => {
    render(<App />);

    const btnEdit = screen.getAllByText("Editar")[0];
    fireEvent.click(btnEdit);

    const btnCancel = screen.getByText("Cancelar");
    expect(btnCancel).toBeInTheDocument();
    fireEvent.click(btnCancel);
    expect(btnCancel).not.toBeInTheDocument();
  });

  test("Remove um item ao clicar no botão de remover", () => {
    render(<App />);

    const btnRem = screen.getAllByText("Remover")[0];
    const newItem = screen.queryByText("Nova Tarefa");
    fireEvent.click(btnRem);
    expect(newItem).not.toBeInTheDocument();
  });

  test("Remove todos os itens ao clicar no botão de remover todos", () => {
    render(<App />);

    const input = screen.getByPlaceholderText("digite sua tarefa");
    fireEvent.change(input, { target: { value: "Nova Tarefa1" } });

    const btnAdd = screen.getByText("Adicionar");
    fireEvent.click(btnAdd);
    const task1 = screen.getByText("Nova Tarefa1");

    fireEvent.change(input, { target: { value: "Nova Tarefa2" } });
    fireEvent.click(btnAdd);
    const task2 = screen.getByText("Nova Tarefa2");

    const btnRem = screen.getByText("Remover Todos");
    fireEvent.click(btnRem);

    expect(task1).not.toBeInTheDocument();
    expect(task2).not.toBeInTheDocument();
  });

  test("O botão de concluir tarefa está funcionando", () => {
    render(<App />);

    const input = screen.getByPlaceholderText("digite sua tarefa");
    fireEvent.change(input, { target: { value: "Tarefa Concluída" } });
    const btnAdd = screen.getByText("Adicionar");
    fireEvent.click(btnAdd);

    const btnSuccess = screen.getByText("Concluido");
    fireEvent.click(btnSuccess);

    const btnRem = screen.getByText("Remover Todos");
    fireEvent.click(btnRem);
    
  });

  test("Verifica se a tarefa concluída é removida corretamente", () => {
    render(<App />);

    const input = screen.getByPlaceholderText("digite sua tarefa");
    fireEvent.change(input, { target: { value: "Tarefa Concluída" } });
    const btnAdd = screen.getByText("Adicionar");
    fireEvent.click(btnAdd);

    const btnSuccess = screen.getByText("Concluido");
    fireEvent.click(btnSuccess);

    const btnRem = screen.getByText("Remover");
    fireEvent.click(btnRem);
  });
});
