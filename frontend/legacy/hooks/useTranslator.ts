import { useTranslation } from "react-i18next";

const useTranslator = (language: string) => {
	const [t, i18n] = useTranslation();

	// i18n.changeLanguage(language);

	const translate = (text: string) => {
		return t(text);
	};

	return { translate };
};

export default useTranslator;
