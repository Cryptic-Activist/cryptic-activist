import {
	getPlatformSettings,
	updatePlatformPrivateSettings,
	updatePlatformPublicSettings
} from '@/services/platformSettings';
import { platformSettings, setPlatformSettings } from '@/stores';
import {
	updatePrivatePlatformSettings,
	updatePublicPlatformSettings
} from './zod';
import { useEffect, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { useMutation, useQuery } from '@tanstack/react-query';

import type { DefaultFields } from './types';
import { useAdmin } from '..';
import { useStore } from '@nanostores/react';

const usePlatformSettings = () => {
	const { admin } = useAdmin();
	const $platformSettings = useStore(platformSettings);

	const [currentPublicIndex, setCurrentPublicIndex] = useState(0);
	const [currentPrivateIndex, setCurrentPrivateIndex] = useState(0);

	const defaultFields: DefaultFields = {
		key: '',
		value: '',
		type: 'STRING',
		deletable: true,
		canBeDeleted: true,
		isEditable: true,
		newField: true
	};

	const {
		control: controlPublic,
		register: registerPublic,
		handleSubmit: handleSubmitPublic,
		formState: { errors: errorsPublic },
		watch: watchPublic,
		reset: resetPublic
	} = useForm({
		resolver: updatePublicPlatformSettings,
		defaultValues: {
			public: [defaultFields]
		}
	});
	const {
		control: controlPrivate,
		register: registerPrivate,
		handleSubmit: handleSubmitPrivate,
		formState: { errors: errorsPrivate },
		watch: watchPrivate,
		reset: resetPrivate
	} = useForm({
		resolver: updatePrivatePlatformSettings,
		defaultValues: {
			private: [defaultFields]
		}
	});

	const watchedPublic = watchPublic();
	const watchedPrivate = watchPrivate();

	const {
		fields: fieldsPublic,
		append: appendPublic,
		remove: removePublic
	} = useFieldArray({ control: controlPublic, name: 'public' });
	const {
		fields: fieldsPrivate,
		append: appendPrivate,
		remove: removePrivate
	} = useFieldArray({ control: controlPrivate, name: 'private' });

	const platformSettingsQuery = useQuery({
		queryKey: ['platformSettings'],
		queryFn: getPlatformSettings,
		enabled: !!admin?.data?.id
	});

	const updatePublicPlatformSettingsMutation = useMutation({
		mutationKey: ['updatePublicPlatformSettings'],
		mutationFn: updatePlatformPublicSettings
	});

	const updatePrivatePlatformSettingsMutation = useMutation({
		mutationKey: ['updatePrivatePlatformSettings'],
		mutationFn: updatePlatformPrivateSettings
	});

	const appendPublicField = () => {
		appendPublic(defaultFields);
		setCurrentPublicIndex((prev) => {
			if (prev > 0) {
				return prev++;
			}
			return prev;
		});
	};

	const appendPrivateField = () => {
		appendPrivate(defaultFields);
		setCurrentPrivateIndex((prev) => {
			if (prev > 0) {
				return prev++;
			}
			return prev;
		});
	};

	const removePublicField = (index: number, canBeDeleted: boolean) => {
		if (!canBeDeleted) return;
		removePublic(index);
		setCurrentPublicIndex((prev) => {
			if (prev > 0) {
				return prev--;
			}
			return prev;
		});
	};

	const removePrivateField = (index: number, canBeDeleted: boolean) => {
		if (!canBeDeleted) return;
		removePrivate(index);
		setCurrentPrivateIndex((prev) => {
			if (prev > 0) {
				return prev--;
			}
			return prev;
		});
	};

	const onSubmitPublic = async (data: any) => {
		await updatePublicPlatformSettingsMutation.mutateAsync(data.public);
	};

	const onSubmitPrivate = async (data: any) => {
		await updatePrivatePlatformSettingsMutation.mutateAsync(data.private);
	};

	useEffect(() => {
		if (platformSettingsQuery.data) {
			setPlatformSettings({
				private: platformSettingsQuery.data?.private,
				public: platformSettingsQuery.data?.public
			});
		}
	}, [platformSettingsQuery.data]);

	useEffect(() => {
		resetPublic({ public: [] });
		$platformSettings.public.forEach((field) => {
			appendPublic({
				key: field.key,
				value: field.value,
				type: field.type,
				deletable: field.canBeDeleted,
				canBeDeleted: field.canBeDeleted,
				isEditable: field.isEditable,
				...(field.canBeDeleted && { newField: true })
			});
			setCurrentPublicIndex((prev) => {
				if (prev > 0) {
					return prev++;
				}
				return prev;
			});
		});

		resetPrivate({ private: [] });
		$platformSettings.private.forEach((field) => {
			appendPrivate({
				key: field.key,
				value: field.value,
				type: field.type,
				deletable: field.canBeDeleted,
				canBeDeleted: field.canBeDeleted,
				isEditable: field.isEditable,
				...(field.canBeDeleted && { newField: true })
			});
			setCurrentPrivateIndex((prev) => {
				if (prev > 0) {
					return prev++;
				}
				return prev;
			});
		});
	}, [$platformSettings]);

	return {
		platformSettings: $platformSettings,
		publicForm: {
			fields: fieldsPublic,
			errors: errorsPublic,
			currentIndex: currentPublicIndex,
			watchedValues: watchedPublic,
			appendField: appendPublicField,
			removeField: removePublicField,
			register: registerPublic,
			handleSubmit: handleSubmitPublic,
			onSubmit: onSubmitPublic,
			updatePublicPlatformSettingsMutation,
			reset: resetPublic
		},
		privateForm: {
			fields: fieldsPrivate,
			errors: errorsPrivate,
			currentIndex: currentPrivateIndex,
			watchedValues: watchedPrivate,
			appendField: appendPrivateField,
			removeField: removePrivateField,
			register: registerPrivate,
			handleSubmit: handleSubmitPrivate,
			onSubmit: onSubmitPrivate,
			updatePrivatePlatformSettingsMutation,
			reset: resetPrivate
		}
	};
};

export default usePlatformSettings;
