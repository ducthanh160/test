import { useState } from "react";
import { useInputRefs } from "../utils/utils";
import { useEditor } from "../utils/utils";

export const useMyComponentState = () => {
    const [type, setType] = useState("");
    const [code, setCode] = useState([]);
    const [error, setError] = useState(null);
    const inputRefs = useInputRefs();
    const { editorData, handleEditorChange } = useEditor();
    const [codeId, setCodeId] = useState("");
    const [nameId, setNameId] = useState("");
    const [modalTitle, setModalTitle] = useState("");
    const [labelTitle, setLabelTitle] = useState("");
    const [placeholderCode, setPlaceholderCode] = useState("");
    const [placeholderName, setPlaceholderName] = useState("");
    const [name, setName] = useState("");
    const [nameInput, setNameInput] = useState("");
    return {
        type,
        setType,
        code,
        setCode,
        error,
        setError,
        inputRefs,
        editorData,
        handleEditorChange,
        codeId,
        setCodeId,
        nameId,
        setNameId,
        modalTitle,
        setModalTitle,
        labelTitle,
        setLabelTitle,
        placeholderCode,
        setPlaceholderCode,
        placeholderName,
        setPlaceholderName,
        name,
        setName,
        nameInput,
        setNameInput,
    };
};

export default useMyComponentState;
