import { useNotes } from '@/context/NotesContext'
import { Pin, Trash2, PinOff } from 'lucide-react-native'
import { useRouter } from 'expo-router'
import { View, Text, Pressable } from 'react-native'

const Note = ({ note }) => {
  const router = useRouter()
  const { deleteNote, togglePin } = useNotes()
  return (
    <View className='p-4 bg-white border border-gray-200 rounded-lg shadow-sm mb-3 flex flex-row justify-between items-center'>
      <Pressable
        onPress={() =>
          router.push({
            pathname: '/edit_modal',
            params: note
          })
        }
      >
        <Text className='text-xl font-bold text-gray-800 mb-2'>
          {note.title}
        </Text>
        <Text className='text-sm text-gray-600 leading-5 mb-3'>
          {note.content}
        </Text>
        <Text className='text-xs text-gray-400'>
          {new Date(note.createdAt).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })}
        </Text>
      </Pressable>
      <View className='flex flex-row gap-2'>
        <View className='border p-2 border-gray-200 rounded-md'>
          <Pressable onPressOut={() => deleteNote(note._id)}>
            <Trash2 color='red' size={20} />
          </Pressable>
        </View>
        <View className='border p-2 border-gray-200 rounded-md'>
          <Pressable onPressOut={() => togglePin(note._id)}>
            {note.pinned ? (
              <PinOff color='green' size={20} />
            ) : (
              <Pin color='green' size={20} />
            )}
          </Pressable>
        </View>
      </View>
    </View>
  )
}

export default Note
