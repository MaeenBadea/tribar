import "./App.css";
import Input from "./components/Input";
import Select from "./components/Select";
import Button from "./components/Button";
import { useState } from "react";
import { train } from "./api/FlaskApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [isXOR, setIsXOR] = useState(true);
  const [formData, setFormData] = useState({
    epochs: 1,
    hidden_size: "",
    activation: "",
    optimizer: "",
    loss: "",
  });

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const trainModel = async (e) => {
    const response = await toast.promise(
      train({
        model_type: isXOR ? "xor" : "switch",
        opt: formData.optimizer,
        loss_func: formData.loss,
        activation: formData.activation,
        hidden_size: formData.hidden_size,
        epochs: formData.epochs,
      }),
      {
        pending: "Request in progress",
        success: "Model trained 👌",
        error: "Opps!Sth wrong happend 🤯",
      }
    );
    console.log(response);
  };
  return (
    <div>
      <ToastContainer
        position="top-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <header>
        <div className="text-box">
          <h1 id="title">Tribar Software GmbH</h1>
          <p id="description">
            Training NN on XOR function &amp; toggle switch circuit
          </p>
        </div>
      </header>
      <div className="container">
        <div id="survey-form">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div className="labels">
              <label>Train Model on</label>
            </div>
            <div
              className="input-tab"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              onChange={(e) => setIsXOR(e.target.value === "xor")}
            >
              <input
                type="radio"
                name="model-type"
                value="xor"
                checked={isXOR}
              />
              XOR Function
              <input
                type="radio"
                name="model-type"
                value="switch"
                checked={!isXOR}
              />
              Toggle Switch circuit
            </div>
          </div>

          <Input
            name="epochs"
            label="epochs"
            placeholder="Enter number of epochs"
            type="number"
            onChange={onChange}
            value={formData.epochs}
          />

          <Select
            name="hidden_size"
            label="Hidden size"
            onChange={onChange}
            options={[8, 16, 32, 64, 128, 256].map((size) => ({
              label: size,
              value: size,
            }))}
          />

          <Select
            name="activation"
            onChange={onChange}
            label="Activation Function"
            options={[
              { label: "Relu", value: "relu" },
              { label: "Sigmoid", value: "sigmoid" },
            ]}
          />
          <Select
            name="loss"
            label="Loss Function"
            onChange={onChange}
            options={[
              { label: "Binary Crossentropy", value: "binary_crossentropy" },
              { label: "Mean Squared Error", value: "mean_squared_error" },
            ]}
          />
          <Select
            name="optimizer"
            label="Optimizer"
            onChange={onChange}
            options={[
              { label: "RMSprop", value: "RMSProp" },
              { label: "Adam", value: "Adam" },
              { label: "Stochastic Gradient Descent", value: "SGD" },
            ]}
          />

          <div className="btn">
            <button onClick={trainModel}>Train Model</button>
          </div>
        </div>
      </div>

      <div className="text-box">
        <h1 id="title">Inference</h1>
        <p id="description">Start Predicting with your trained model</p>

        <div className="btns-container">
          <Button title={"0"}/>
          <Button title={"0"}/>

          <Button title={"0"}/>
          <Button title={"0"}/>

        </div>

        <div className="labels">
          <label id="email-label" for="email">
            Inputs to predict "X_pred"
          </label>
        </div>
        <div className="input-tab">
          <div className="span-field" type="email" id="email" name="email">
            1,2,2,001,2
          </div>
        </div>

        <div className="labels">
          <label id="email-label" for="email">
            Predictions
          </label>
        </div>
        <div className="input-tab">
          <div className="span-field" type="email" id="email" name="email">
            1,0,1,0,1
          </div>
        </div>

        <div className="btn">
          <button onClick={()=>alert('predict')}>Predict</button>
        </div>
      </div>

      <footer>
        <p>&copy; 2023 Maeen Alikarrar</p>
      </footer>
    </div>
  );
}

export default App;
