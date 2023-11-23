import { useEffect } from "react";
interface IEventProp {
	keys: string[];
	// eventType: keyof DocumentEventMap;
	returnedAction: () => void;
}
// https://medium.com/nerd-for-tech/using-custom-hooks-to-handle-keyboard-shortcuts-in-react-a91649a81c87
// https://medium.com/@paulohfev/problem-solving-custom-react-hook-for-keydown-events-e68c8b0a371
export function useKeyUpEvent({ keys, returnedAction }: IEventProp) {
	useEffect(() => {
		document.addEventListener('keyup', handleListenedEvent);
		return () => {
			document.removeEventListener('keyup', handleListenedEvent);
		}
	}, [])

	function handleListenedEvent(event: KeyboardEvent) {
		if (keys?.includes(event?.code?.toLowerCase())) {
			event.preventDefault();
			returnedAction();
		}
	}

}