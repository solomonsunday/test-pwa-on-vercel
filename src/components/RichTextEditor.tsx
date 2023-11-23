"use client"
import dynamic from 'next/dynamic';
import { useMemo } from 'react';
import 'react-quill/dist/quill.snow.css';

export default function RichTextEditor({ emitContent, content }: {
	content?: string;
	emitContent: (content: string) => void;
}) {
	const ReactQuill = useMemo(() => dynamic(() => import('react-quill'), { ssr: false }), []);


	const modules = {
		toolbar: [
			[{ 'header': [1, 2, 3, 4, 5, 6, false] }],
			['bold', 'italic', 'underline', 'strike', 'blockquote'],
			[{ 'list': 'ordered' },
			{ 'list': 'bullet' },
			{ 'indent': '-1' },
			{ 'indent': '+1' }],
			['link', 'image'],
			['clean']
		],
	};

	const formats = [
		'header',
		'bold', 'italic', 'underline', 'strike', 'blockquote',
		'list', 'bullet', 'indent',
		'link', 'image'
	];



	return (
		<ReactQuill
			theme="snow"
			formats={formats}
			modules={modules}
			placeholder='Compose description...'
			className='mt-1'
			// value={content}
			onChange={(value) => emitContent(value)} />
	);
}
