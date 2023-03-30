# import needed libraries
import tensorflow as tf
import numpy as np


# Define the model architecture
def build_model(input_shape=2, hidden_size=2, activation="relu", loss_func="mse", opt="adam"):
    model = tf.keras.Sequential([
        tf.keras.layers.Dense(2, input_shape=(input_shape,), activation=activation),
        tf.keras.layers.Dense(hidden_size, activation=activation),
        tf.keras.layers.Dense(1, activation="sigmoid")
    ])
    # Compile the model
    model.compile(optimizer=opt, loss=loss_func, metrics=['accuracy'])
    return model


class XorModel:
    def train_model(self, epochs, hidden_size, activation, loss_func, opt):
        print('training on xor func')
        # define your training data
        X_train = np.array([[0, 0], [0, 1], [1, 0], [1, 1]])
        y_train = np.array([[0], [1], [1], [0]])
        xor_model = build_model(input_shape=2, hidden_size=hidden_size, activation=activation,
                                loss_func=loss_func,
                                opt=opt)
        # save model when accuracy enhances
        checkpoint_cb = tf.keras.callbacks.ModelCheckpoint(filepath='model_checkpoint', save_best_only=True,
                                                           monitor='accuracy',
                                                           mode='max')
        # stop when accuracy doesn't enhance for 10 epochs
        early_stopping_cb = tf.keras.callbacks.EarlyStopping(patience=500, monitor="accuracy")

        # start the training
        history = xor_model.fit(X_train, y_train, epochs=epochs, callbacks=[checkpoint_cb, early_stopping_cb])
        # images???
        # save user model
        xor_model.save('src/models/xor_user_best')

        # test model
        x_test = np.array([[0, 0], [0, 1], [1, 0], [1, 1]])
        y_test = np.array([[0], [1], [1], [0]])
        loss, accuracy = xor_model.evaluate(x_test, y_test)
        print('Test accuracy:', accuracy)
        print('Test loss:', loss)
        return loss, accuracy

    def predict(self, X_pred):
        X_pred = np.array(X_pred)
        loaded_model = tf.keras.models.load_model('src/models/xor_user_best')
        predictions = loaded_model.predict(X_pred)
        print(f"Predictions: {predictions.flatten().round()}")
        return predictions.flatten().round()


class SwitchModel:

    def train_model(self, epochs, hidden_size, activation, loss_func, opt):
        print('training on toggle switch func')
        # define your training data
        X_train = np.array([0, 1])
        y_train = np.array([1, 0])

        switch_model = build_model(input_shape=1, hidden_size=hidden_size, activation=activation,
                                   loss_func=loss_func,
                                   opt=opt)
        # save model when accuracy enhances
        checkpoint_cb = tf.keras.callbacks.ModelCheckpoint(filepath='model_checkpoint', save_best_only=True,
                                                           monitor='accuracy',
                                                           mode='max')
        # stop when accuracy doesn't enhance for 10 epochs
        early_stopping_cb = tf.keras.callbacks.EarlyStopping(patience=500, monitor="accuracy")

        # start the training
        history = switch_model.fit(X_train, y_train, epochs=epochs, callbacks=[checkpoint_cb, early_stopping_cb])
        # save user model
        switch_model.save('src/models/toggle_switch_user_best')

        # test model
        x_test = np.array([0, 1])
        y_test = np.array([1, 0])
        loss, accuracy = switch_model.evaluate(x_test, y_test)
        print('Test accuracy:', accuracy)
        print('Test loss:', loss)
        return loss, accuracy

    def predict(self, X_pred):
        X_pred = np.array(X_pred)
        loaded_model = tf.keras.models.load_model('src/models/toggle_switch_user_best')
        predictions = loaded_model.predict(X_pred)
        print(f"Predictions: {predictions.flatten().round()}")
        return predictions.flatten().round()
