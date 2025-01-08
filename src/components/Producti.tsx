import { Pressable, PressableProps, Text } from "react-native";

type Props = PressableProps & {
    data: {
      name: string
      quantity: number
    }
    // onDelete: () => void
    // onOpen: () => void
  }

export function Product ({ data, ...rest }: Props){
    return <Pressable {...rest}>
        <Text> {data.quantity} - {data.name}</Text>
    </Pressable>
}