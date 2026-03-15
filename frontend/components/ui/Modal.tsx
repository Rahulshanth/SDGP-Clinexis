import React from "react";
import {
  Modal as RNModal,
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

interface ModalProps {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({
  visible,
  onClose,
  children,
}) => {
  return (
    <RNModal transparent visible={visible} animationType="fade">
      <TouchableOpacity style={styles.overlay} onPress={onClose}>
        <View style={styles.modalContent}>
          {children}
        </View>
      </TouchableOpacity>
    </RNModal>
  );
};

export default Modal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "85%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
  },
});